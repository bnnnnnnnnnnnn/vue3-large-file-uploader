import type { Role, User } from './type'
import supabase from '@/services/supabase'

// 获取所有用户
export async function getUsers(page = 1, perPage = 10): Promise<User[]> {
  const { data, error } = await supabase.auth.admin.listUsers({
    page,
    perPage,
  })

  if (error) {
    console.error('获取用户列表失败', error)
    throw error
  }

  return data.users.map(user => ({
    id: user.id,
    email: user.email || '',
    phone: user.phone || '',
    role: user.user_metadata?.role || [],
    description: user.user_metadata?.description || '',
  }))
}

// 创建用户
export async function createUser(user: Partial<User>) {
  const { email, phone, password, role, description = '' } = user

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    phone,
    password,
    user_metadata: {
      role,
      description,
    },
  })

  if (error) {
    throw error
  }

  return data.user
}

// 更新角色信息
export async function updateUserRole(id: string, role: Role[], description = '') {
  const { data, error } = await supabase.auth.admin.updateUserById(id, {
    user_metadata: {
      role,
      description,
    },
  })

  if (error) {
    throw error
  }

  return data.user
}

// 更新描述信息
export async function updateDescription(id: string, description: string) {
  const { data, error } = await supabase.auth.admin.updateUserById(id, {
    user_metadata: {
      description,
    },
  })

  if (error) {
    throw error
  }

  return data.user
}

// 删除用户
export async function deleteUser(id: string) {
  const { error } = await supabase.auth.admin.deleteUser(id)
  if (error)
    throw error
}

// 修改用户密码
export async function updateAccounts(account: Partial<User>) {
  if (!account.id || !account.password) {
    throw new Error('缺少用户ID或新密码')
  }

  const { data, error } = await supabase.auth.admin.updateUserById(account.id, {
    password: account.password,
  })
  if (error)
    throw error
  return data || []
}

// 获取角色列表
export async function getRoles(): Promise<Role[]> {
  const { data, error } = await supabase.from('roles').select('*')
  if (error)
    throw error
  return data || []
}
