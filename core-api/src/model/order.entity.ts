import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Checkpoint } from './checkpoint.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryColumn({ type: 'varchar', length: 60, nullable: false })
  orderNo!: string;

  @OneToMany(() => Checkpoint, (checkpoint) => checkpoint.trackingNumber)
  trackingNumber: string | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  courier: string | null;

  @Column({ type: 'varchar', length: 20, nullable: false })
  street: string;

  @Column()
  zeepCode: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  destinationCountryIso3: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  email!: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  articleNo: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  articleImageUrl: string | null;

  @Column()
  quantity: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  productName: string;
}
