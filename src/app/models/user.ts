import { Payment } from "./payment";
import { Post } from "./post";
import { Profile } from "./profile";
export class User {

    id: number;
    // role_id: number = 3; // 3 = Rol miembro
    username: string = "";
    email: string = "";
    password?: string = "";
    first_name: string = "";
    last_name: string = "";
    token: string = "";
    is_active: number = 0;
    created_at: string = "";
    role?: 'SUPERADMIN' | 'ADMIN' | 'MEMBER' | 'EDITOR' | 'GUEST';
    payments: Payment;
    profiles: Profile;
    posts: Post;

}
