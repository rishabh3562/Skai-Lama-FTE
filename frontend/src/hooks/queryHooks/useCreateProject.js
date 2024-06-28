import { useMutation } from '@tanstack/react-query';
import { createProject } from '../../utils/helpers/ProjectApi';
import { queryClient } from '../../main';

export const useCreateProject = () => {
    return useMutation({
        mutationKey: ['createProject'],
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects-list'] }); // Invalidate the query to refresh the projects list
        },
        onError: (error) => {
            // console.error('Error creating project:', error);
        },
        onSettled: (data, error) => {
            if (error) {
                // console.error('Error creating project:', error);
            } else {
                // console.log('Project created successfully:', data);
            }
        },
    });
};
