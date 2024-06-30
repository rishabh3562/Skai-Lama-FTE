    import {useQuery} from '@tanstack/react-query'
    import axios from 'axios'

    import {getSlug} from '../../utils/helpers/ProjectApi';
    export const useGetSlug = (projectId) => {
        return useQuery({
            queryKey: ['slug', `slug-${projectId}`], // Use `slug-${projectId`],
            queryFn: () => getSlug(projectId),
        })
    }