export async function getCategorias() {
    const response = await fetch('/api/categorias');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}
