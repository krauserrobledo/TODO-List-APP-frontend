import { Mapper } from '../../../../base/utils/mapper';
import { UserEntity } from '../../../../domain/entities/user-entity';
import { UserModel } from '../../../models/user-entity';


export class UserImplementationRepositoryMapper extends Mapper<UserModel, UserEntity> {
    mapFrom(param: UserModel): UserEntity {
        return {
            id: param.id,
            username: param.userName,
            email: param.eMail
        };
    }
    mapTo(param: UserEntity): UserModel {
        return {
            id: param.id,
            userName: param.username,
            eMail: param.email
        }
    }
}
