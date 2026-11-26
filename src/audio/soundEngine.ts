import type { SoundType } from '../types/game';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private sfxEnabled = true;
  private musicEnabled = true;
  private musicInterval: number | null = null;
  private musicStep = 0;

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public unlock() {
    this.ensureContext();
    if (this.musicEnabled && !this.musicInterval) {
      this.startMusicLoop();
    }
  }

  public setSettings(sfxEnabled: boolean, musicEnabled: boolean) {
    this.sfxEnabled = sfxEnabled;
    this.musicEnabled = musicEnabled;
    if (!musicEnabled) {
      this.stopMusicLoop();
    } else if (this.ctx && !this.musicInterval) {
      this.startMusicLoop();
    }
  }

  private playTone(
    freqStart: number,
    freqEnd: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.18,
    delay = 0
  ) {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freqStart, now);
    if (freqEnd !== freqStart) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), now + duration);
    }

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + Math.min(0.02, duration * 0.25));
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  private playNoiseSplash(duration = 0.14, volume = 0.12) {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + duration);
    filter.Q.value = 1.8;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  }

  public playBloop() {
    if (!this.sfxEnabled) return;
    this.playTone(340, 560, 0.11, 'sine', 0.18);
  }

  public playPop() {
    if (!this.sfxEnabled) return;
    this.playTone(480, 760, 0.08, 'triangle', 0.14);
  }

  public playSplashChime() {
    if (!this.sfxEnabled) return;
    this.playNoiseSplash(0.14, 0.14);
    this.playTone(280, 640, 0.12, 'sine', 0.16);
    this.playTone(523.25, 523.25, 0.22, 'triangle', 0.14, 0.04);
  }

  public playDingDing() {
    if (!this.sfxEnabled) return;
    this.playTone(784, 784, 0.14, 'sine', 0.15, 0.06);
    this.playTone(1046.5, 1046.5, 0.24, 'sine', 0.17, 0.16);
  }

  public playStarTwinkle() {
    if (!this.sfxEnabled) return;
    const notes = [880, 1174.66, 1318.5, 1567.98];
    notes.forEach((n, idx) => {
      this.playTone(n, n, 0.18, 'sine', 0.12, idx * 0.07);
    });
  }

  public playLevelUnlockFanfare() {
    if (!this.sfxEnabled) return;
    this.playNoiseSplash(0.3, 0.1);
    const chord = [523.25, 659.25, 783.99, 1046.5];
    chord.forEach((n, idx) => {
      this.playTone(n, n, 0.45, 'triangle', 0.15, 0.12 + idx * 0.09);
    });
  }

  public playAnimalSound(soundType: SoundType) {
    if (!this.sfxEnabled) return;

    switch (soundType) {
      case 'dog':
        // Double cheerful bark: "woof! woof!"
        this.playTone(240, 140, 0.14, 'sawtooth', 0.14, 0);
        this.playTone(320, 180, 0.11, 'triangle', 0.16, 0.01);
        this.playTone(260, 130, 0.16, 'sawtooth', 0.14, 0.22);
        this.playTone(340, 175, 0.13, 'triangle', 0.16, 0.23);
        break;
      case 'cat':
        // Sweet rising-falling "meee-oww"
        this.playTone(520, 780, 0.18, 'triangle', 0.16, 0);
        this.playTone(780, 460, 0.34, 'sine', 0.18, 0.17);
        break;
      case 'cow':
        // Warm low "Moooo"
        this.playTone(145, 130, 0.55, 'sawtooth', 0.11, 0);
        this.playTone(145, 125, 0.55, 'triangle', 0.15, 0);
        break;
      case 'duck':
        // Playful double "quack-quack!"
        this.playTone(420, 310, 0.12, 'sawtooth', 0.12, 0);
        this.playTone(440, 300, 0.13, 'sawtooth', 0.12, 0.18);
        break;
      case 'pig':
        // Bouncy "oink-oink!"
        this.playTone(180, 290, 0.12, 'sawtooth', 0.11, 0);
        this.playTone(190, 320, 0.14, 'sawtooth', 0.11, 0.18);
        break;
      case 'frog':
        this.playTone(190, 420, 0.1, 'square', 0.08, 0);
        this.playTone(210, 480, 0.12, 'square', 0.08, 0.16);
        break;
      case 'lion':
      case 'tiger':
      case 'bear':
        this.playTone(170, 95, 0.45, 'sawtooth', 0.14, 0);
        this.playNoiseSplash(0.32, 0.1);
        break;
      case 'elephant':
        this.playTone(360, 620, 0.24, 'sawtooth', 0.12, 0);
        this.playTone(620, 420, 0.28, 'sawtooth', 0.11, 0.22);
        break;
      case 'owl':
        this.playTone(440, 420, 0.18, 'sine', 0.16, 0);
        this.playTone(420, 380, 0.34, 'sine', 0.16, 0.26);
        break;
      case 'bee':
        this.playTone(220, 235, 0.45, 'sawtooth', 0.07, 0);
        break;
      case 'dolphin':
      case 'parrot':
        this.playTone(880, 1480, 0.14, 'sine', 0.14, 0);
        this.playTone(1180, 1720, 0.14, 'sine', 0.14, 0.16);
        break;
      default:
        // Friendly playful chirp/bounce for any other animal
        this.playTone(460, 680, 0.13, 'triangle', 0.15, 0);
        this.playTone(620, 880, 0.16, 'sine', 0.15, 0.15);
        break;
    }
  }

  public playCelebrationJingle(soundType: SoundType) {
    if (!this.sfxEnabled) return;
    const melody = [523.25, 659.25, 783.99, 1046.5];
    melody.forEach((n, idx) => {
      this.playTone(n, n, 0.22, 'triangle', 0.15, idx * 0.11);
    });
    window.setTimeout(() => {
      this.playAnimalSound(soundType);
    }, 520);
  }

  public startMusicLoop() {
    if (!this.musicEnabled || this.musicInterval !== null) return;
    this.ensureContext();
    // Gentle C-major pentatonic ukulele/xylophone pattern
    const pattern = [523.25, 659.25, 783.99, 659.25, 880, 783.99, 659.25, 587.33];
    this.musicInterval = window.setInterval(() => {
      if (!this.musicEnabled || !this.ctx || this.ctx.state !== 'running') return;
      const freq = pattern[this.musicStep % pattern.length];
      this.playTone(freq, freq, 0.34, 'sine', 0.032);
      this.musicStep += 1;
    }, 520);
  }

  public stopMusicLoop() {
    if (this.musicInterval !== null) {
      window.clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const soundEngine = new SoundEngine();
