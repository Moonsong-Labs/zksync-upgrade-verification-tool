import { UserRoleSchema } from "@/common/user-role-schema";
import { unauthorized } from "@/utils/http";
import { USER_ADDRESS_HEADER, USER_ROLE_HEADER } from "@server/middlewares/auth";

export function getUserFromHeader(request: Request) {
  const address = request.headers.get(USER_ADDRESS_HEADER);
  const role = request.headers.get(USER_ROLE_HEADER);
  const parsedRole = UserRoleSchema.optional().safeParse(role);
  return { address, role: parsedRole.data ?? null };
}

export function requireUserFromHeader(request: Request) {
  const { address, role } = getUserFromHeader(request);

  const parsedRole = UserRoleSchema.safeParse(role);
  if (!parsedRole.success) {
    throw unauthorized();
  }

  return { address, role: parsedRole.data };
}
