import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'checkpoints' })
export class Checkpoint {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.trackingNumber)
  order: Order;

  @Column({ type: 'varchar', length: 60, nullable: false })
  location: string;

  @Column()
  timestamp: Date;

  @Column({ type: 'varchar', length: 30, nullable: false })
  status: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  statusText: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  statusDetail: string;
}
