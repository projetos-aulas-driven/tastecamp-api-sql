export function maxCategoriesError() {
    return {
        type: "invalidCategory",
        message: "Selecione no máximo 3 categorias"
    }
}

export function minCategoriesError() {
    return { 
        type: "invalidCategory", 
        message: "Selecione pelo menos 1 categoria" 
    }
}

export function conflictError(entity) {
    return { 
        type: "conflict", 
        message: `Uma ${entity} com esse título já existe!` 
    }
}