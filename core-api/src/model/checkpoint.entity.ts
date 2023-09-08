import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Order } from './order.entity';
import { Type } from 'class-transformer';

@Entity({ name: 'checkpoints' })
@Unique('check_unique_constraint', ['trackingNumber', 'timestamp'])
export class Checkpoint {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.checkpoints)
  order!: Order;

  @Column({ type: 'varchar', length: 255, nullable: false })
  trackingNumber!: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  location: string;

  @Type(() => Date)
  @Column({ nullable: false })
  timestamp!: Date;

  @Column({ type: 'varchar', length: 30, nullable: false })
  status!: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  statusText!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  statusDetail: string;

  public toEntity(item: any = null) {
    const it = new Checkpoint();
    it.id = this.id;
    it.trackingNumber = item?.tracking_number;
    it.location = item?.location || null;
    it.timestamp = item?.timestamp;
    it.status = item?.status;
    it.statusText = item?.status_text;
    it.statusDetail = item?.status_detail || null;

    return it;
  }
}
