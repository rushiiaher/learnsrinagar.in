-- Add is_all_schools column to existing live_classes table
ALTER TABLE `live_classes` 
ADD COLUMN `is_all_schools` boolean DEFAULT FALSE AFTER `school_id`,
MODIFY COLUMN `school_id` int DEFAULT NULL;