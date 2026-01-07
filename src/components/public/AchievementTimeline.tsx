import { Timeline } from "../ui/timeline";
import { type SectionProps } from '../../types/ModelInfo';
import { Timestamp } from "firebase/firestore";
import { motion } from 'framer-motion';

export const AchievementsTimeline = ({ model }: SectionProps) => {
    const achievements = model.achievements.map((ach) => ({
        ...ach,
        date: ach.date instanceof Timestamp ? ach.date.toDate() : new Date(ach.date),
    }));

    const data = achievements
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .map((achievement, index) => ({
            achievement: achievement,
            title: achievement.date.getFullYear().toString(),
            image: achievement.imageUrl,
            content: (
                <div className={`relative flex flex-col items-start space-y-4 p-4 md:p-0 text-left ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                    {/* Title */}
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="md:text-lg text-sm font-bold uppercase text-soft-black w-full">
                        {achievement.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="md:text-sm text-xs text-primary w-full">
                        {achievement.description}
                    </motion.p>
                </div >
            ),
        }));

    return (
        <div className="relative w-full overflow-clip">
            <Timeline data={data} />
        </div>
    );
}
