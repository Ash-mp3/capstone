export default function handleStatus(res) {
	if (res.status === 200) {
		return "authorized";
	} else {
		return "unauthorized";
	}
}
