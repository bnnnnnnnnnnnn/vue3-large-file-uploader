import supabase from "@/services/supabase";
import type { menus, User,Role } from "@/api/system/type";

//菜单管理
/**
 * 获取所有菜单
 * @returns {Promise<any[]>} 菜单列表
 */
export const getMenuList = async () => {
  return supabase
    .from("menus")
    .select("*")
    .order("sort_order", { ascending: true });
};

// 新增/编辑菜单
export const saveMenu = async (data: menus) => {
  if (data.id) {
    // 编辑菜单
    return supabase.from("menus").update(data).where({ id: data.id });
  } else {
    // 新增菜单
    return supabase.from("menus").insert(data);
  }
};

/**
 * 获取所有用户
 */
export const getUsers = async (page = 1, perPage = 10): Promise<User[]> => {
  const { data, error } = await supabase.auth.admin.listUsers({
    page,
    perPage,
  });

  if (error) {
    console.error("获取用户列表失败", error);
    throw error;
  }

  return data.users.map((user) => ({
    id: user.id,
    email: user.email || "",
    role: user.user_metadata?.role || "未分配",
  }));
};

// /**
//  * 创建用户
//  */
// export const createUser = async (
//   email: string,
//   password: string,
//   role
// ) => {
//   const { data, error } = await supabase.auth.admin.createUser({
//     email,
//     password,
//     user_metadata: { role,roleId },
//     email_confirm: true, // 是否自动确认邮箱
//   });
//   if (error) throw error;
//   return data.user;
// };

// /**
//  * 更新用户角色
//  */
// export const updateUserRole = async (id: string, role: string) => {
//   const { error } = await supabase.auth.admin.updateUserById(id, {
//     user_metadata: { role },
//   });
//   if (error) throw error;
// };

// /**
//  * 删除用户
//  */
// export const deleteUser = async (id: string) => {
//   const { error } = await supabase.auth.admin.deleteUser(id);
//   if (error) throw error;
// };


// /**
//  * 修改密码 更新
//  * 
//  */
// export const updateAccounts = async (account: User)=>{

//   const { data, error } = await supabase.auth.updateUser({
//     email: account.email, // 使用用户名作为email
//     password: account.password,
//   })
//   if (error) throw error;
//   return data || [];
// }

