import axios from 'axios'

export default axios.create({
    baseURL: 'https://quiz-react-65a6b-default-rtdb.europe-west1.firebasedatabase.app'
})