import axios from '@/lib/axios'
import userMock from '@/mocks/user'
import { useEffect } from 'react'
import useLocalStorage from './localStorage'

export const useAuth = () => {
    const [user, setUser] = useLocalStorage('user')

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    useEffect(() => {
        if (!user) {
            setUser(userMock())
        }
    }, [user, setUser])

    return {
        user,
        csrf,
    }
}
