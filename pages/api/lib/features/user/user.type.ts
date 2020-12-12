import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @ObjectIdColumn()
  readonly id!: ObjectID;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  email!: string;
}
