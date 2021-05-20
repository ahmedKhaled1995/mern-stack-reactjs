import axios from "axios";

const loadData = async (endPoint) => {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const data = await axios.get(endPoint, config);
        const dataArray = data.data;
        return dataArray;
    } catch (error) {
        return { error };
    }
};

export default loadData;