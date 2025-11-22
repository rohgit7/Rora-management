import React, { useEffect, useMemo, useState } from 'react'
import api from '../lib/api'

export default function ResourceList({ title, resource, schema }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [mode, setMode] = useState('view')
  const [formPairs, setFormPairs] = useState([])
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({})
  const [listPath, setListPath] = useState(`/api/${resource}`)

  // Backend route base path
  const basePath = `/api/${resource}`

  // ----------------------------
  // Load Data
  // ----------------------------
  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError("")

    // For appointments and billing, prefer enriched endpoint to get names
    const needsEnriched = resource === 'appointments' || resource === 'billing'
    const candidates = needsEnriched 
      ? [`${basePath}/enriched`, basePath]
      : [basePath, `${basePath}/enriched`]
    
    const tryFetch = async () => {
      for (let i = 0; i < candidates.length; i++) {
        try {
          const res = await api.get(candidates[i])
          if (!mounted) return
          const data = Array.isArray(res.data) ? res.data : (res.data?.data || [])
          setItems(data)
          setListPath(candidates[i])
          setLoading(false)
          return
        } catch (err) {
          // Only log error if it's the last candidate
          if (i === candidates.length - 1 && mounted) {
            console.error(`Failed to fetch ${candidates[i]}:`, err)
          }
        }
      }
      if (mounted) {
        setError("Failed to load data")
        setLoading(false)
      }
    }
    tryFetch()

    return () => (mounted = false)
  }, [resource, basePath])

  // ----------------------------
  // Helper Computed Values
  // ----------------------------
  const displayed = useMemo(() => {
    if (!query) return items
    const q = query.toLowerCase()
    return items.filter(it => JSON.stringify(it).toLowerCase().includes(q))
  }, [items, query])

  const columns = useMemo(() => {
    const sample = displayed[0]
    if (!sample) return []
    const allKeys = Object.keys(sample)
    
    // Separate ID columns, name columns, and other columns
    const idColumns = []
    const nameColumns = []
    const otherColumns = []
    
    allKeys.forEach(key => {
      if (key.endsWith('_id')) {
        idColumns.push(key)
      } else if (key.endsWith('_name')) {
        nameColumns.push(key)
      } else {
        otherColumns.push(key)
      }
    })
    
    // Sort to pair IDs with their names: patient_id, patient_name, doctor_id, doctor_name, etc.
    const sorted = []
    const processedNames = new Set()
    
    // Add ID columns and their corresponding names
    idColumns.forEach(idKey => {
      sorted.push(idKey)
      const nameKey = idKey.replace('_id', '_name')
      if (nameColumns.includes(nameKey)) {
        sorted.push(nameKey)
        processedNames.add(nameKey)
      }
    })
    
    // Add remaining name columns that weren't paired
    nameColumns.forEach(nameKey => {
      if (!processedNames.has(nameKey)) {
        sorted.push(nameKey)
      }
    })
    
    // Add other columns
    sorted.push(...otherColumns)
    
    return sorted.slice(0, 10) // Increased limit to show more columns including names
  }, [displayed])

  const idKey = useMemo(() => {
    const s = items[0]
    if (!s) return "id"
    if ("id" in s) return "id"
    if ("_id" in s) return "_id"
    const alt = Object.keys(s).find(k => k.endsWith("_id"))
    return alt || "id"
  }, [items])

  const toPairs = obj =>
    Object.entries(obj || {}).map(([k, v]) => ({
      key: k,
      value: typeof v === 'object' ? JSON.stringify(v) : String(v),
    }))

  const fromPairs = pairs => {
    const o = {}
    pairs.forEach(({ key, value }) => {
      if (!key) return
      try { o[key] = JSON.parse(value) }
      catch { o[key] = value }
    })
    return o
  }

  const initFormFromSchema = base => {
    const o = {}
    schema?.fields?.forEach(f => {
      o[f.name] = base?.[f.name] ?? ''
    })
    return o
  }

  // ----------------------------
  // Modal
  // ----------------------------
  const openCreate = () => {
    if (schema?.fields?.length) {
      setForm(initFormFromSchema(null))
      setFormPairs([])
    } else {
      const base = items[0] || {}
      setFormPairs(toPairs(base))
    }
    setMode("create")
    setSelected(null)
  }

  const openView = r => {
    setSelected(r)
    setMode("view")
  }

  const openEdit = r => {
    if (schema?.fields?.length) {
      setForm(initFormFromSchema(r))
      setFormPairs([])
    } else {
      const copy = { ...r }
      delete copy[idKey]
      setFormPairs(toPairs(copy))
    }
    setSelected(r)
    setMode("edit")
  }

  const closeModal = () => {
    setSelected(null)
    setSaving(false)
    setFormPairs([])
    setMode("view")
  }

  // ----------------------------
  // PDF Download (unchanged)
  // ----------------------------
  const downloadPdf = () => {
    if (!selected) return
    const esc = s =>
      String(s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")

    const rows = Object.entries(selected)
      .map(([k, v]) => `
        <tr>
          <td class="k">${esc(k)}</td>
          <td class="v">${esc(typeof v === "object" ? JSON.stringify(v) : String(v))}</td>
        </tr>
      `)
      .join("")

    const html = `<!doctype html>
<html>
<head><meta charset="utf-8"><title>Details</title>
<style>
body{font-family:Inter,Arial,Helvetica,sans-serif;color:#0f172a;margin:24px}
h1{font-size:20px;margin:0 0 16px}
table{width:100%;border-collapse:collapse}
td{border:1px solid #e3e8ef;padding:8px;vertical-align:top}
td.k{background:#f8fafc;font-weight:600;width:30%}
td.v{width:70%}
@media print{button{display:none}}
</style></head>
<body>
<h1>${esc(title)}</h1>
<table>${rows}</table>
</body></html>`

    const w = window.open("", "_blank")
    w.document.open()
    w.document.write(html)
    w.document.close()
    w.print()
  }

  // ----------------------------
  // CRUD
  // ----------------------------
  const refresh = () => {
    setLoading(true)
    api.get(listPath)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data?.data || [])
        setItems(data)
      })
      .catch(() => setError("Failed to load data"))
      .finally(() => setLoading(false))
  }

  const createItem = async () => {
    setSaving(true)
    const body = schema?.fields?.length ? form : fromPairs(formPairs)

    try {
      await api.post(basePath, body)
      closeModal()
      refresh()
    } catch (err) {
      console.error(err)
      setError("Create failed")
    }
    setSaving(false)
  }

  const updateItem = async () => {
  if (!selected) return;

  setSaving(true);
  const id = selected[idKey];
  const body = schema && schema.fields?.length ? form : fromPairs(formPairs);

  try {
    // 🔥 Correct URL (matches your backend)
    await api.put(`${basePath}/${id}`, body);

    closeModal();
    refresh();
  } catch (err) {
    console.error("Update error:", err);
    setError("Update failed");
  }

  setSaving(false);
};


  const deleteItem = async row => {
    const id = row[idKey]
    if (!id) return
    if (!window.confirm("Delete this item?")) return

    try {
      await api.delete(`${basePath}/${id}`)
      refresh()
    } catch (err) {
      console.error(err)
      setError("Delete failed")
    }
  }

  // ----------------------------
  // UI Rendering
  // ----------------------------
  return (
    <div className="card">

      {/* Header */}
      <div className="card-header">
        <div className="card-title">{title}</div>
        <div className="toolbar">
          <input
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="btn primary" onClick={openCreate}>Add</button>
        </div>
      </div>

      {/* States */}
      {loading && <div className="state">Loading...</div>}
      {error && <div className="state error">{error}</div>}

      {/* Table */}
      {!loading && !error && (
        <div className="table">
          <div 
            className="table-header"
            style={{
              gridTemplateColumns: `repeat(${columns.length}, minmax(120px, auto)) 260px`
            }}
          >
            {columns.map(c => (
              <div key={c} className="th">{c}</div>
            ))}
            <div className="th actions">Actions</div>
          </div>

          {displayed.map((row, idx) => (
            <div 
              className="tr" 
              key={idx}
              style={{
                gridTemplateColumns: `repeat(${columns.length}, minmax(120px, auto)) 260px`
              }}
            >
              {columns.map(col => (
                <div key={col} className="td">{String(row[col] ?? '')}</div>
              ))}
              <div className="td actions">
                <button className="btn ghost" onClick={() => openView(row)}>View</button>
                <button className="btn ghost" onClick={() => openEdit(row)}>Update</button>
                <button className="btn ghost" onClick={downloadPdf}>Print</button>
                <button className="btn danger" disabled={saving} onClick={() => deleteItem(row)}>Delete</button>
              </div>
            </div>
          ))}

          {displayed.length === 0 && <div className="state">No data</div>}
        </div>
      )}

      {/* ---------------- View Modal ---------------- */}
      {mode === "view" && selected && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Details</div>
              <div className="modal-actions">
                <button className="btn" onClick={downloadPdf}>Download PDF</button>
                <button className="btn" onClick={() => openEdit(selected)}>Edit</button>
                <button className="btn" onClick={closeModal}>Close</button>
              </div>
            </div>

            <div className="kv">
              {Object.entries(selected).map(([k, v]) => {
                let displayValue = v
                if (typeof v === "object") {
                  displayValue = JSON.stringify(v)
                } else {
                  displayValue = String(v ?? '')
                }
                
                return (
                  <div className="kv-row" key={k}>
                    <div className="kv-key">{k}</div>
                    <div className="kv-val">{displayValue}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Create / Edit Modal ---------------- */}
      {(mode === "create" || mode === "edit") && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{mode === "create" ? "Add" : "Update"}</div>
              <div className="modal-actions">
                <button className="btn" onClick={closeModal}>Cancel</button>
                <button className="btn primary" disabled={saving}
                  onClick={mode === "create" ? createItem : updateItem}>
                  Save
                </button>
              </div>
            </div>

            <div className="form-grid">
              {schema?.fields?.length ? (
                schema.fields.map((f, i) => (
                  <div className="form-row" key={i}>
                    <div className="label">{f.label || f.name}</div>

                    {f.type === "textarea" ? (
                      <textarea
                        className="input"
                        rows="3"
                        value={form[f.name] ?? ""}
                        onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                      />

                    ) : f.type === "select" ? (
                      <select
                        className="input"
                        value={form[f.name] ?? ""}
                        onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                      >
                        <option value="">Select</option>
                        {(f.options || []).map(opt => (
                          <option key={opt.value || opt} value={opt.value || opt}>
                            {opt.label || opt}
                          </option>
                        ))}
                      </select>

                    ) : f.type === "date" ? (
                      <input
                        type="date"
                        className="input"
                       value={form[f.name] ? new Date(form[f.name]).toISOString().split("T")[0] : ""}


                       onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                      />

                    ) : (
                      <input
                        className="input"
                        type={f.type}
                        value={form[f.name] ?? ""}
                        onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                      />
                    )}
                  </div>
                ))
              ) : (
                <>
                  {formPairs.map((p, i) => (
                    <div className="form-row" key={i}>
                      <input
                        className="input"
                        placeholder="Field"
                        value={p.key}
                        onChange={e => {
                          const arr = [...formPairs]
                          arr[i].key = e.target.value
                          setFormPairs(arr)
                        }}
                      />
                      <input
                        className="input"
                        placeholder="Value"
                        value={p.value}
                        onChange={e => {
                          const arr = [...formPairs]
                          arr[i].value = e.target.value
                          setFormPairs(arr)
                        }}
                      />
                      <button className="btn ghost"
                        onClick={() => {
                          const arr = [...formPairs]
                          arr.splice(i, 1)
                          setFormPairs(arr)
                        }}>
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    className="btn"
                    onClick={() => setFormPairs([...formPairs, { key: "", value: "" }])}
                  >
                    Add field
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
