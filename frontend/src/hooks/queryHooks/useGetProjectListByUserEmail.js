import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

import {getProjectsByUserEmail} from '../../utils/helpers/ProjectApi';
export const useGetProjectListByUserEmail = (email) => {
    return useQuery({
        queryKey: ['projects-list', email],
        queryFn: () => getProjectsByUserEmail(email),
    })
}