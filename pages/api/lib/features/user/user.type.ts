import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectID,
  ObjectIdColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @ObjectIdColumn()
  public readonly _id!: ObjectID;

  @Field()
  @Column()
  public name!: string;

  @Field()
  @Index({ unique: true })
  @Column()
  public email!: string;

  @Field()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @CreateDateColumn()
  public updatedAt!: Date;
}
