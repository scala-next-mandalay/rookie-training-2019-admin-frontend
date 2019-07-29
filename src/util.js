export const validateForm  = (validationSettings, values) => {
  let errors = {}
  for (const [method, fields] of Object.entries(validationSettings)) {
    errors = {...errors, ...validateByMethod(method, fields, values)}
  }
  return Object.keys(errors).length === 0 ? null : errors
}


const validateByMethod = (method, fields, values) => {
  const errors = {}
  
  //key check if method isEmpty
  if (method === 'isEmpty') {
    for (let key of fields) {
      if (!(key in values)) {
        errors[key] = true
      }
    }
  }
}

