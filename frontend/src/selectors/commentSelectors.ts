import { State } from '../store/Store';
import { Comment } from '../utils/types';

export const commentSelectors = {
    getCommentsByDataId: (state: State, dataIndex: number) =>
        Object.values(state.comments).filter((comment: Comment) => comment.data_id === dataIndex),
};
