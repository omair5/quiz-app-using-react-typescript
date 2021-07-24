interface category {
    id: number,
    name: string
}

async function FetchCategories(): Promise<category[]> {
    const res = await fetch('https://opentdb.com/api_category.php')
    const { trivia_categories } = await res.json()
    return trivia_categories
}
export default FetchCategories;