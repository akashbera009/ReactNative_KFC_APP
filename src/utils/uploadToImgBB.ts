export const uploadToImgBB = async ({ path, mime, filename }: { path: string, mime: string, filename: string | undefined }) => {
    const apiKey: string = 'd06eae4d7c1aa532c95c7d19fed969f6'
    let data = new FormData();
    data.append("image", {
        uri: path,
        type: mime,
        name: filename || "photo.jpg",
    });
    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        const result = await response.json();
        if (result.success) {
            return result.data.url;
        } else {
            console.log("Upload error:", result);
            return null;
        }
    } catch (error) {
        console.log("Upload failed:", error);
        return null;
    }
};