import { Roles } from "src/common/interfaces/roles.enum";

export interface AuthParameterDto {
    roles: Roles[],
    sameUser?: boolean
}