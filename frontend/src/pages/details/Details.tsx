import {useContext, useState} from 'react'
import styles from "./Details.module.css"
import { useParams } from 'react-router-dom'
import { useMovieById } from '../../api/moviesApi'
import { useAddComment, useCommentsByMovieId, useDeleteComment } from '../../api/commentApi'
import { AuthContext } from '../../context/AuthContext'
import { CommentType } from '../../types'



const Details = () => {
    const { id } = useParams();
    const { data: movie, isLoading, error } = useMovieById(id ?? "");
    const { data: comments } = useCommentsByMovieId(id ?? "");

    const { currentUser } = useContext(AuthContext)

    const [newComment, setNewComment] = useState("");

    const { mutate: addComment, isPending: addCommentPending } = useAddComment();
    const { mutate: deleteComment, isPending: deleteCommentPending } = useDeleteComment();

    const handleAddComment = async () => {
      if(newComment.trim() !== "") {
        await addComment({ movieId: id ?? "", userId: currentUser._id, username: currentUser.username, text: newComment });
        setNewComment("");
        window.location.reload();
      }
    }

    const handleDeleteComment = async (commentId: string) => {
      await deleteComment(commentId);
      window.location.reload();
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error</div>
    }

  return (
    <div className={styles.container}>
      <div className={styles.movieContainer}>
        <img src={movie?.image} alt={movie?.name} />
        <div className={styles.movieContent}>
          <h2>{movie?.name}</h2>
          <div>
            <p>{movie?.year}</p>
            <p>{movie?.category.join(", ")}</p>
          </div>
          <button>İzle</button>
          <p>{movie.description}</p>
        </div>
      </div>
      <div className={styles.comments}>
        <h2>Comments <span>({comments?.length ?? 0})</span></h2>
        
        {currentUser ? (
        <div className={styles.addComment}>
          <textarea
            placeholder="Write your comment here"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment} disabled={addCommentPending}>Comment</button>
        </div>
        ) : (
          <div className={styles.addComment}>
            <p>You must be logged in to post a comment.</p>
          </div>
        )}

        {comments?.map((comment: CommentType) => (
          <div className={styles.comment}>
            <div className={styles.commentUser}>
              <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="user" width={32} height={32} />
              <div>
                <h3>{comment.username}</h3>
                <span>{comment.createdAt.substring(0,10)}</span>
              </div>
            </div>
            <div className={styles.commentContent}>
              <p>{comment.text}</p>
              {currentUser?._id === comment.userId && (
                <button onClick={() => handleDeleteComment(comment._id)} disabled={deleteCommentPending}>Delete</button>
              )}
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Details