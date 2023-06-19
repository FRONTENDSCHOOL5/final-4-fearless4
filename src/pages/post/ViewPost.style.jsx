import styled from 'styled-components';
import { OptionModalTab } from '../../components/navbar/navbar.style';
import ProfilePic from '../../assets/image/alpaca.png';

export const WrapperViewPost = styled.div`
	width: 100%;
	position: relative;
	box-sizing: border-box;
`;

// 게시글 작성에도 동일한 컴포넌트가 사용되니 묶어서 정리할 것
export const ProfileImagePost = styled.img`
	display: block;
	width: 42px;
	height: 42px;
	border-radius: 50%;
	object-fit: cover;
`;

export const OptionModalTabComment = styled(OptionModalTab)`
	width: 20px;
	height: 20px;

	margin-left: auto;
`;

// 게시글 컴포넌트 삽입 전 임시로 작성
export const PostView = styled.div`
	width: 100%;
	height: 434px;
	background-color: #81d8d0;
	display: flex;
	padding: 68px 16px 26px 16px;
	justify-content: center;
	align-items: center;
	border-bottom: 2px solid #dbdbdb;
	box-sizing: border-box;
`;

export const CommentSection = styled.section`
	width: 100%;
	height: auto;
	padding: 20px 16px;
	box-sizing: border-box;
`;

export const CommentWrapper = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 12px;
	flex-shrink: 0;
`;

export const FollowerProfileImageComment = styled.img`
	display: block;
	width: 36px;
	height: 36px;
	border-radius: 50%;
	object-fit: cover;
`;

export const CommentDetail = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	flex-shrink: 0;
`;

export const CommentFollower = styled.div`
	display: flex;
	gap: 6px;
	align-items: center;
	width: 270px;
	margin-top: 6px;
`;
export const CommentFollowerName = styled.p`
	font-size: 14px;
`;
export const CommentTime = styled.p`
	font-size: 10px;
	color: #767676;
`;
export const CommentText = styled.p`
	width: 100%;
	max-width: 260px;
	font-size: 14px;
	color: #333333;
	white-space: pre-line;
`;

export const Comment = () => {
	return (
		<CommentWrapper>
			<FollowerProfileImageComment
				src={ProfilePic}
			></FollowerProfileImageComment>
			<CommentDetail>
				<CommentFollower>
					<CommentFollowerName>서귀포시 무슨 농장</CommentFollowerName>
					<CommentTime>5분 전</CommentTime>
				</CommentFollower>

				<CommentText>
					댓글 테스트 중입니다 왘! 댓글 테스트 중입니다 왘!댓글 테스트 중입니다
					왘!댓글 테스트 중입니다 왘!댓글 테스트 중입니다 왘!
				</CommentText>
			</CommentDetail>
			<OptionModalTabComment />
		</CommentWrapper>
	);
};

export const UploadComment = styled.div`
	width: 100%;
	box-sizing: border-box;
	padding: 12px 16px;
	border-top: 1px solid #dbdbdb;
	position: fixed;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 18px;
`;

export const ProfileImageComment = styled.img`
	display: block;
	width: 36px;
	height: 36px;
	border-radius: 50%;
	object-fit: cover;
`;

export const CommentInputArea = styled.textarea`
	width: 260px;
	resize: none;
	border: none;
	font-size: 14px;

	&::placeholder {
		font-size: 14px;
	}
	&:focus {
		outline: none;
	}
`;

export const CommentUploadButton = styled.button`
	width: 40px;
	border: none;
	background-color: #fff;
	color: #81d8d0;
	cursor: pointer;
	font-size: 14px;
	font-weight: 700;
`;
