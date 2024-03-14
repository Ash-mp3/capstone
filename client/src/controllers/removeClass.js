
export default async function addClass(class_id) {
  let ok;
  try {
    const response = await fetch(`/api/removeClass`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ class_id }),
    });
    if (response.ok) {
      ok = true;
    } else {
      ok = false;
    }
    const data = await response.json();
    return { msg: data.msg, ok: ok };
  } catch (error) {
    console.error("Error adding class:", error);
    return { msg: "Error adding class", ok: false };
  }
}