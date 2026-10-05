import confetti from 'canvas-confetti';

export const triggerCelebration = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#4E8C6D', '#10B981', '#F59E0B', '#38BDF8', '#F43F5E']
    });
  } catch (e) {
    console.log('Confetti triggered', e);
  }
};

export const triggerSubtleSparkle = () => {
  try {
    confetti({
      particleCount: 30,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#3D7157', '#C5DFD0', '#F59E0B'],
      ticks: 150
    });
  } catch (e) {
    console.log('Sparkle triggered', e);
  }
};
