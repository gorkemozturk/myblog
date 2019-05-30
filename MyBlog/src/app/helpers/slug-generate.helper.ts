export function SlugGenerate(input: string): string {
    if (!input) { return; }

    let slug = input.toLowerCase().trim();

    slug = slug.replace(/[^a-z0-9\s-]/g, ' ');
    slug = slug.replace(/[\s-]+/g, '-');

    return slug;
}