import { User, Users, Shield, Heart, Mic, Home, Compass, Star } from 'lucide-react';

const iconMap = { User, Users, Shield, Heart, Mic, Home, Compass, Star };

export const getIcon = (name) => iconMap[name] || Star;

export const iconOptions = Object.keys(iconMap);
