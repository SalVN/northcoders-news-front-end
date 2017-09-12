import * as actions from '../../src/actions/actions';

import reducer from '../../src/reducer/comments.reducer';

describe('reducer', () => {
    const initialState = {
        comments: [],
        loading: false,
        error: null
    };
    const commentsState = {
        comments: [{
            _id: '59b11ae18807841d9bf13234',
            body: 'this is a comment',
            belongs_to: '59b11ae18807841d9bf13232',
            __v: 0,
            created_by: 'northcoder',
            votes: 0,
            created_at: 1504778965845
        },
        {
            _id: '59b11ae18807841d9bf13235',
            body: 'this is another comment',
            belongs_to: '59b11ae18807841d9bf13232',
            __v: 0,
            created_by: 'northcoder',
            votes: 0,
            created_at: 1504778965845
        },
        {
            _id: '59b11ae18807841d9bf13236',
            body: 'this is my comment',
            belongs_to: '59b11ae18807841d9bf13232',
            __v: 0,
            created_by: 'northcoder',
            votes: 0,
            created_at: 1504778977306
        }],
        loading: false,
        error: null
    };
    const comments = [{
        _id: '59b11ae18807841d9bf13234',
        body: 'this is a comment',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder',
        votes: 0,
        created_at: 1504778965845
    },
    {
        _id: '59b11ae18807841d9bf13235',
        body: 'this is another comment',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder',
        votes: 0,
        created_at: 1504778965845
    },
    {
        _id: '59b11ae18807841d9bf13236',
        body: 'this is my comment',
        belongs_to: '59b11ae18807841d9bf13232',
        __v: 0,
        created_by: 'northcoder',
        votes: 0,
        created_at: 1504778977306
    }];

    it('is a function', () => {
        expect(typeof reducer).toBe('function');
    });

    it('returns the initial state if no action is provided', () => {
        const result = reducer(initialState);
        expect(result).toBe(initialState);
    });

    describe('FETCH_COMMENTS_REQUEST', () => {
        const action = actions.fetchCommentsRequest();
        const result = reducer(initialState, action);
        it('should return loading as true', () => {
            expect(result.loading).toBe(true);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(result.comments).toEqual([]);
            expect(result.error).toBe(null);
        });

        it('uses the initial state if no state is provided', () => {
            const result = reducer();
            expect(result.comments).toEqual([]);
            expect(result.loading).toBe(false);
            expect(result.error).toBe(null);
        });

        it('returns the initial state if an incorrect action is provided', () => {
            const resultEmpty = reducer(initialState, 'FETCH');
            const resultComments = reducer(commentsState, 'FETCH');
            expect(resultEmpty).toBe(initialState);
            expect(resultComments).toBe(commentsState);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.comments).not.toBe(initialState.comments);
        });
    });

    describe('FETCH_COMMENTS_SUCCESS', () => {
        const action = actions.fetchCommentsSuccess(comments);
        const result = reducer(initialState, action);
        it('should return loading as false', () => {
            expect(result.loading).toBe(false);
        });

        it('should return an array of comments', () => {
            expect(result.comments).toEqual(comments);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(result.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.comments).not.toBe(initialState.comments);
        });
    });

    describe('FETCH_COMMENTS_ERROR', () => {
        const error = { status: 400, message: 'INVALID URL' };
        const action = actions.fetchCommentsError(error);
        const result = reducer(initialState, action);

        it('should return loading as false', () => {
            expect(result.loading).toBe(false);
        });

        it('should return an empty array for comments', () => {
            expect(result.comments).toEqual([]);
        });

        it('should return the error', () => {
            expect(result.error).toEqual(error);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.comments).not.toBe(initialState.comments);
        });
    });

    describe('ADD_COMMENT_REQUEST', () => {
        const action = actions.addCommentRequest();
        const resultEmpty = reducer(initialState, action);
        const resultComments = reducer(commentsState, action);
        it('should return loading as true', () => {
            expect(resultEmpty.loading).toBe(true);
            expect(resultComments.loading).toBe(true);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(resultEmpty.comments).toEqual([]);
            expect(resultEmpty.error).toBe(null);
            expect(resultComments.comments).toEqual(comments);
            expect(resultComments.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(resultEmpty).not.toBe(initialState);
            expect(resultEmpty.comments).not.toBe(initialState.comments);
            expect(resultComments).not.toBe(commentsState);
            expect(resultComments.comments).not.toBe(commentsState.comments);
        });
    });

    describe('ADD_COMMENT_SUCCESS', () => {
        const data = { savedComment: JSON.stringify({ body: 'Add New Comment', created_by: 'northcoder' }) };
        const action = actions.addCommentSuccess(data);
        const resultEmpty = reducer(initialState, action);
        const resultComments = reducer(commentsState, action);

        it('should return loading as false', () => {
            expect(resultEmpty.loading).toBe(false);
            expect(resultComments.loading).toBe(false);
        });

        it('should return an array of comments, adding the new comment', () => {
            const newComments = [...comments];
            newComments.push(data.savedComment);
            expect(initialState.comments.length).toBe(0);
            expect(initialState.comments).toEqual([]);
            expect(resultEmpty.comments.length).toBe(1);
            expect(resultEmpty.comments).toEqual([data.savedComment]);

            expect(commentsState.comments.length).toBe(3);
            expect(commentsState.comments).toEqual(comments);
            expect(resultComments.comments.length).toBe(4);
            expect(resultComments.comments).toEqual(newComments);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(resultEmpty.error).toBe(null);
            expect(resultComments.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(resultEmpty).not.toBe(initialState);
            expect(resultEmpty.comments).not.toBe(initialState.comments);

            expect(resultComments).not.toBe(commentsState);
            expect(resultComments.comments).not.toBe(commentsState.comments);
        });
    });

    describe('ADD_COMMENT_ERROR', () => {
        const error = { status: 400, message: 'INVALID URL' };
        const action = actions.addCommentError(error);
        const resultEmpty = reducer(initialState, action);
        const resultComments = reducer(commentsState, action);

        it('should return loading as false', () => {
            expect(resultEmpty.loading).toBe(false);
            expect(resultComments.loading).toBe(false);
        });

        it('should return a copy of the previous state for comments', () => {
            expect(resultEmpty.comments).toEqual([]);
            expect(resultComments.comments).toEqual(comments);
        });

        it('should return the error', () => {
            expect(resultEmpty.error).toEqual(error);
            expect(resultComments.error).toEqual(error);
        });

        it('should not mutate the initial state', () => {
            expect(resultEmpty).not.toBe(initialState);
            expect(resultEmpty.comments).not.toBe(initialState.comments);

            expect(resultComments).not.toBe(commentsState);
            expect(resultComments.comments).not.toBe(commentsState.comments);
        });
    });

    describe('DELETE_COMMENT_REQUEST', () => {
        const action = actions.deleteCommentRequest();
        const resultComments = reducer(commentsState, action);
        it('should return loading as true', () => {
            expect(resultComments.loading).toBe(true);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(resultComments.comments).toEqual(comments);
            expect(resultComments.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(resultComments).not.toBe(commentsState);
            expect(resultComments.comments).not.toBe(commentsState.comments);
        });
    });

    describe('DELETE_COMMENT_SUCCESS', () => {
        const deletedComment = {
            _id: '59b11ae18807841d9bf13235',
            body: 'this is another comment',
            belongs_to: '59b11ae18807841d9bf13232',
            __v: 0,
            created_by: 'northcoder',
            votes: 0,
            created_at: 1504778965845
        };
        const action = actions.deleteCommentSuccess(deletedComment);
        const resultComments = reducer(commentsState, action);

        it('should return loading as false', () => {
            expect(resultComments.loading).toBe(false);
        });

        it('should return an array of comments, without the deleted comment', () => {
            const updatedComments = [{
                _id: '59b11ae18807841d9bf13234',
                body: 'this is a comment',
                belongs_to: '59b11ae18807841d9bf13232',
                __v: 0,
                created_by: 'northcoder',
                votes: 0,
                created_at: 1504778965845
            },
            {
                _id: '59b11ae18807841d9bf13236',
                body: 'this is my comment',
                belongs_to: '59b11ae18807841d9bf13232',
                __v: 0,
                created_by: 'northcoder',
                votes: 0,
                created_at: 1504778977306
            }];

            expect(commentsState.comments.length).toBe(3);
            expect(resultComments.comments.length).toBe(2);
            expect(resultComments.comments).toEqual(updatedComments);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(resultComments.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(resultComments).not.toBe(commentsState);
            expect(resultComments.comments).not.toBe(commentsState.comments);
        });
    });

    describe('DELETE_COMMENT_ERROR', () => {
        const error = { status: 400, message: 'INVALID URL' };
        const action = actions.deleteCommentError(error);
        const resultComments = reducer(commentsState, action);

        it('should return loading as false', () => {
            expect(resultComments.loading).toBe(false);
        });

        it('should return a copy of the previous state for comments', () => {
            expect(resultComments.comments).toEqual(comments);
        });

        it('should return the error', () => {
            expect(resultComments.error).toEqual(error);
        });

        it('should not mutate the initial state', () => {
            expect(resultComments).not.toBe(commentsState);
            expect(resultComments.comments).not.toBe(commentsState.comments);
        });
    });

    describe('VOTE_COMMENT_REQUEST', () => {
        const action = actions.voteCommentRequest();
        const resultComments = reducer(commentsState, action);
        it('should return loading as true', () => {
            expect(resultComments.loading).toBe(true);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(resultComments.comments).toEqual(comments);
            expect(resultComments.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(resultComments).not.toBe(commentsState);
            expect(resultComments.comments).not.toBe(commentsState.comments);
        });
    });

    describe('VOTE_COMMENT_SUCCESS', () => {
        const comment = {
            _id: '59b11ae18807841d9bf13234',
            body: 'this is a comment',
            belongs_to: '59b11ae18807841d9bf13232',
            __v: 0,
            created_by: 'northcoder',
            votes: 1,
            created_at: 1504778965845
        };

        const updatedComments = [{
            _id: '59b11ae18807841d9bf13234',
            body: 'this is a comment',
            belongs_to: '59b11ae18807841d9bf13232',
            __v: 0,
            created_by: 'northcoder',
            votes: 1,
            created_at: 1504778965845
        },
        {
            _id: '59b11ae18807841d9bf13235',
            body: 'this is another comment',
            belongs_to: '59b11ae18807841d9bf13232',
            __v: 0,
            created_by: 'northcoder',
            votes: 0,
            created_at: 1504778965845
        },
        {
            _id: '59b11ae18807841d9bf13236',
            body: 'this is my comment',
            belongs_to: '59b11ae18807841d9bf13232',
            __v: 0,
            created_by: 'northcoder',
            votes: 0,
            created_at: 1504778977306
        }];
        const action = actions.voteCommentSuccess({ comment: comment });
        const result = reducer(commentsState, action);
        it('should return loading as false', () => {
            expect(result.loading).toBe(false);
        });

        it('should return an array of comments', () => {
            expect(Array.isArray(result.comments)).toBe(true);
            expect(result.comments.length).toBe(3);
        });

        it('should update the number of votes to the appropriate comment in the comments list', () => {
            expect(result.comments[0].votes).toBe(1);
            expect(result.comments[1].votes).toBe(0);
            expect(result.comments[2].votes).toBe(0);
            expect(result.comments).toEqual(updatedComments);
        });

        it('should return the other parts of the state as the same as the initial state', () => {
            expect(result.error).toBe(null);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(initialState);
            expect(result.comments).not.toBe(initialState.comments);
        });
    });

    describe('VOTE_COMMENT_ERROR', () => {
        const error = { status: 400, message: 'INVALID URL' };
        const action = actions.voteCommentError(error);
        const result = reducer(commentsState, action);

        it('should return loading as false', () => {
            expect(result.loading).toBe(false);
        });

        it('should return an array identical to the previous state for articles', () => {
            expect(result.comments).toEqual(commentsState.comments);
        });

        it('should return the error', () => {
            expect(result.error).toEqual(error);
        });

        it('should not mutate the initial state', () => {
            expect(result).not.toBe(commentsState);
            expect(result.comments).not.toBe(commentsState.comments);
        });
    });
});