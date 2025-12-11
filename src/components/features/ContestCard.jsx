import { motion } from 'framer-motion';
import { Music,Users,ArrowRight } from 'lucide-react';
import { Badge,Button } from '../common'; // adapte le chemin selon ta structure
export const ContestCard = ({ contest, onParticipate }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100"
  >
    <div className={`h-32 bg-gradient-to-br ${contest.color} p-6 flex flex-col justify-between relative overflow-hidden`}>
      <div className="absolute top-0 right-0 p-4 opacity-20 transform rotate-12">
        <Music className="w-24 h-24 text-white" />
      </div>
      <Badge variant="default" size="sm" className="w-fit bg-white/20 backdrop-blur-md text-white border-white/10">
        {contest.type}
      </Badge>
      <h3 className="text-white font-bold text-xl relative z-10">{contest.title}</h3>
    </div>

    <div className="p-6">
      <p className="text-slate-600 text-sm mb-6">{contest.description}</p>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500">Récompense</span>
          <span className="font-bold text-indigo-600">{contest.reward}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500">Date limite</span>
          <Badge variant="danger" size="sm">{contest.deadline}</Badge>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500">Participants</span>
          <div className="flex items-center text-slate-700 font-medium">
            <Users className="w-4 h-4 mr-1 text-slate-400" />
            {contest.participants}
          </div>
        </div>
      </div>

      <Button onClick={() => onParticipate(contest)} variant="primary" fullWidth>
        Participer maintenant <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  </motion.div>
);
