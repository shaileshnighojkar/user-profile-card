import axios, { AxiosError } from "axios"

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
})

export type ApiResponse<T> = [data: T | null, error: string | null]

function transformUser(userProfile: UserProfile): UserProfile {
  const { id, name, email } = userProfile
  return {
    id,
    name,
    email,
    profilePicture: `https://i.pravatar.cc/320?img=${id}`,
  }
}

export async function getUserProfile(userId: number): Promise<ApiResponse<UserProfile>> {
  try {
    const response = await http.get<UserProfile>(`/users/${userId}`)

    return [transformUser(response.data), null]
  } catch (error: unknown) {
    // We can use I18n (Internationalization) to localize such messages
    let errorMessage = `Unable to fetch user profile for userId: '${userId}' `

    if (error instanceof AxiosError) {
      if (error.status == 404) {
        errorMessage = `User does not exists for userId: '${userId}'`
      }
    }

    return [null, errorMessage]
  }
}

export async function getUserPosts(userId: number): Promise<ApiResponse<UserPost[]>> {
  try {
    const response = await http.get<UserPost[]>(`/posts?userId=${userId}`)

    return [response.data, null]
  } catch (error: unknown) {
    // We can use I18n (Internationalization) to localize such messages
    let errorMessage = `Unable to fetch user posts for userId: '${userId}' `

    if (error instanceof AxiosError) {
      if (error.status == 404) {
        errorMessage = `User does not exists for userId: '${userId}'`
      }
    }

    return [null, errorMessage]
  }
}

export async function searchUser(query: string): Promise<ApiResponse<UserProfile[]>> {
  try {
    const response = await http.get<UserProfile[]>(`/users`)
    const filteredUsers = response.data
      .filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
      .map(transformUser)

    return [filteredUsers, null]
  } catch (error: unknown) {
    return [null, "Failed to search users"]
  }
}
