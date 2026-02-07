import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column()
  date: string;

  @Column({ nullable: true })
  img: string | null;

  @Column('jsonb', { nullable: true, default: () => "'[]'::jsonb" })
  image: string[];

  @Column({ type: 'text', nullable: true })
  fullContent: string | null;

  @Column({ nullable: true })
  video: string | null;
}
