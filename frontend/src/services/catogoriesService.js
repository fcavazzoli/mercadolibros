import { Backend } from "./backend"

export const getCategories = async () => {
    const backend = new Backend()
    console.log('Getting Categories...')
    const categories = await backend.get('/categories')
    console.log('Categories: ', categories)

    return categories
}