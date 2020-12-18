import { gql } from 'react-apollo'

// # 头像上传
const mutationavatarCallback = gql`avatarCallback{
	avatarUploadCallback(input:{
		avatar_url: "http://img.kid17.com/xxx",
		user_id: "3e4a4a1a-92ca-4fc5-80c0-c18179ac40e7"
	})
	{new_avatar}
}
`

export default mutationavatarCallback
