// 과제 3-2: state: PostListState와 onSelect를 받는 Props interface를 작성하세요.
import styled from "styled-components";
import PostItem from "./PostItem";
import type { Post, PostListState } from "../types";

interface PostListProps {
  state: PostListState;
  onSelect: (post: Post) => void;

  favorites: Post[];
  onToggleFavorite: (post: Post) => void;
}

function PostList({
  state,
  onSelect,
  favorites,
  onToggleFavorite,
}: PostListProps) {
  if (state.status === "loading") {
    return <Message>게시글을 불러오는 중입니다.</Message>;
  }

  if (state.status === "error") {
    return <Message>오류: {state.message}</Message>;
  }

  if (state.status === "empty") {
    return <Message>아직 게시글이 없습니다.</Message>;
  }

  return (
    <List>
      {state.data.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onSelect={onSelect}
          isFavorite={favorites.some(
            (f) => f.id === post.id
          )}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </List>
  );
}

const List = styled.div`
  margin: 0;
`;

const Message = styled.p`
  margin-top: 20px;
`;


export default PostList;
