import React, { useEffect, useMemo, useRef, useState } from 'react';
import Core from 'smooothy';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ChevronRight,
  ClipboardCheck,
  Clock,
  HeartPulse,
  MapPin,
  Menu,
  Microscope,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import lungsUrl from '../images/lungs.png';
import doctorUrl from '../images/dr.png';
import doctorTwoUrl from '../images/dr2.png';
import pressClippingsUrl from '../images/press-clippings.png';
import whyLungsUrl from '../images/why-lungs-bg.png';
import './styles.css';

const beforeScrollPhoto = {
  src: doctorTwoUrl,
  alt: 'Dr. Apoorv Sinha consultation portrait',
};

const afterScrollPhotos = [
  { src: doctorUrl, alt: 'Dr. Apoorv Sinha portrait' },
  { src: lungsUrl, alt: 'Transparent lung anatomy visual' },
  {
    src: 'https://images.pexels.com/photos/29702932/pexels-photo-29702932/free-photo-of-woman-using-asthma-inhaler-on-white-background.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    alt: 'Asthma inhaler care',
  },
  {
    src: 'https://images.pexels.com/photos/5593681/pexels-photo-5593681.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    alt: 'Respiratory support with oxygen mask',
  },
  {
    src: 'https://images.pexels.com/photos/9882204/pexels-photo-9882204.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    alt: 'Patient with chronic cough',
  },
  {
    src: 'https://images.pexels.com/photos/4225878/pexels-photo-4225878.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    alt: 'Chest X-ray consultation',
  },
  {
    src: 'https://images.pexels.com/photos/7579832/pexels-photo-7579832.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    alt: 'Lung X-ray review',
  },
  {
    src: 'https://images.pexels.com/photos/6129203/pexels-photo-6129203.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    alt: 'Pulmonology clinic hallway',
  },
  {
    src: 'https://images.pexels.com/photos/4975676/pexels-photo-4975676.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    alt: 'Breathlessness symptom care',
  },
  {
    src: 'https://images.pexels.com/photos/4989186/pexels-photo-4989186.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    alt: 'Lung scan review',
  },
  {
    src: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    alt: 'Stethoscope and medical appointment',
  },
  {
    src: 'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    alt: 'Respiratory medicine consultation',
  },
];

const mosaicPalette = ['#e9f8fa', '#bce7ed', '#0799aa', '#ecf3f4', '#fa7462', '#dce9ed', '#f7fbfc'];
const photoTileIndexes = new Set([0, 2, 5, 8, 11, 14, 17, 21, 23, 27, 30, 33, 37, 40, 44, 46, 48]);

const pulmonologyTreatments = [
  {
    title: 'Asthma Treatment',
    tag: 'Airway control',
    description: 'Trigger review, inhaler technique, preventer planning, and follow-up for recurrent wheeze or breathlessness.',
    accent: '#f26f35',
    src: 'https://images.pexels.com/photos/29702932/pexels-photo-29702932/free-photo-of-woman-using-asthma-inhaler-on-white-background.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1',
  },
  {
    title: 'COPD & Emphysema',
    tag: 'Long-term breathing',
    description: 'Stepwise care for chronic breathlessness, cough, flare-ups, inhalers, and pulmonary rehabilitation needs.',
    accent: '#0399aa',
    src: 'https://images.pexels.com/photos/5593681/pexels-photo-5593681.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1',
  },
  {
    title: 'Chronic Bronchitis',
    tag: 'Cough pathway',
    description: 'Evaluation for persistent phlegm, airway irritation, infection risk, and seasonal worsening patterns.',
    accent: '#fb745f',
    src: 'https://images.pexels.com/photos/9882204/pexels-photo-9882204.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1',
  },
  {
    title: 'Pneumonia Care',
    tag: 'Infection care',
    description: 'Chest infection assessment, X-ray review, oxygen-risk checks, medicines, and recovery monitoring.',
    accent: '#0f7891',
    src: 'https://images.pexels.com/photos/4225878/pexels-photo-4225878.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1',
  },
  {
    title: 'Tuberculosis Care',
    tag: 'TB follow-up',
    description: 'TB symptom review, report interpretation, treatment adherence guidance, and respiratory recovery tracking.',
    accent: '#e75743',
    src: 'https://images.pexels.com/photos/7579832/pexels-photo-7579832.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1',
  },
  {
    title: 'Bronchiectasis',
    tag: 'Airway damage',
    description: 'Care for repeated infections, sputum, airway clearance, scan review, and flare prevention.',
    accent: '#2aa7b8',
    src: 'https://images.pexels.com/photos/6129203/pexels-photo-6129203.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1',
  },
  {
    title: 'Chronic Cough',
    tag: 'Symptom detective',
    description: 'Structured work-up for cough triggers including allergy, reflux, asthma, infection, and medication history.',
    accent: '#f26f35',
    src: 'https://images.pexels.com/photos/4975676/pexels-photo-4975676.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1',
  },
  {
    title: 'Sleep Breathing Disorders',
    tag: 'Night breathing',
    description: 'Screening for snoring, daytime sleepiness, oxygen dips, and sleep-related breathing disruption.',
    accent: '#036c87',
    src: 'https://images.pexels.com/photos/6775183/pexels-photo-6775183.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1',
  },
  {
    title: 'Allergy Breathing Care',
    tag: 'Seasonal triggers',
    description: 'Allergy-linked cough, wheeze, rhinitis, dust exposure, and prevention plans for recurring symptoms.',
    accent: '#fb745f',
    src: 'https://images.pexels.com/photos/4114713/pexels-photo-4114713.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1',
  },
  {
    title: 'Lung Nodules',
    tag: 'Report review',
    description: 'Calm interpretation of scan findings, risk context, follow-up intervals, and referral decisions.',
    accent: '#0399aa',
    src: 'https://images.pexels.com/photos/4989186/pexels-photo-4989186.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1',
  },
  {
    title: 'Pulmonary Rehabilitation',
    tag: 'Breathing strength',
    description: 'Recovery support with breathing exercises, pacing, oxygen-risk awareness, and activity confidence.',
    accent: '#e75743',
    src: 'https://images.pexels.com/photos/20100299/pexels-photo-20100299.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1',
  },
  {
    title: 'Smoking Cessation',
    tag: 'Habit support',
    description: 'Practical quitting support connected to cough, COPD risk, lung recovery, and relapse prevention.',
    accent: '#0f7891',
    src: 'https://images.pexels.com/photos/17237100/pexels-photo-17237100/free-photo-of-close-up-of-person-smoking-cigarette-in-dark.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1',
  },
  {
    title: 'Post-COVID Breathlessness',
    tag: 'Recovery checks',
    description: 'Follow-up for lingering breathlessness, fatigue, cough, scan findings, and oxygen concerns after infection.',
    accent: '#2aa7b8',
    src: 'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1',
  },
  {
    title: 'Pleural Disease',
    tag: 'Chest lining',
    description: 'Assessment for pleural fluid, chest pain, breathlessness, imaging reports, and next-step planning.',
    accent: '#f26f35',
    src: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&dpr=1',
  },
];

const whyChooseReasons = [
  {
    icon: HeartPulse,
    title: 'Pulmonology-focused care',
    text: 'Consultations stay centered on breath, cough, sleep, infection history, and the small triggers patients often forget to mention.',
  },
  {
    icon: ClipboardCheck,
    title: 'Clear diagnosis path',
    text: 'Symptoms, reports, examination, and follow-up testing are brought together before treatment decisions are made.',
  },
  {
    icon: BadgeCheck,
    title: 'Plans patients can follow',
    text: 'Medicine schedules, inhaler steps, precautions, and warning signs are explained in plain language for home care.',
  },
  {
    icon: Microscope,
    title: 'Testing-led decisions',
    text: 'Asthma, COPD, TB, infection, allergy, and sleep concerns are matched with the right investigation instead of guesswork.',
  },
  {
    icon: ShieldCheck,
    title: 'Long-term monitoring',
    text: 'Recurring breathing issues are tracked over time so treatment can change when symptoms, seasons, or reports change.',
  },
  {
    icon: MapPin,
    title: 'Ranchi clinic access',
    text: 'Care is designed around local patients who need specialist respiratory support without a confusing hospital runaround.',
  },
];

const clinicHours = [
  ['Monday', '10:00 AM - 4:00 PM'],
  ['Tuesday', '10:00 AM - 4:00 PM'],
  ['Wednesday', '10:00 AM - 4:00 PM'],
  ['Thursday', '10:00 AM - 4:00 PM'],
  ['Friday', '10:00 AM - 4:00 PM'],
  ['Saturday', '10:00 AM - 4:00 PM'],
  ['Sunday', 'Closed'],
];

const pressClippings = [
  {
    title: 'Free health camp announcement',
    source: 'Ranchi community coverage',
    position: '3% 18%',
    zoom: 1.58,
    size: 'tall',
  },
  {
    title: 'Free check-up camp coverage',
    source: 'Local newspaper report',
    position: '47% 29%',
    zoom: 1.88,
    size: 'wide',
  },
  {
    title: 'Respiratory awareness quote',
    source: 'Asthma public advice',
    position: '90% 18%',
    zoom: 1.72,
    size: 'tall',
  },
  {
    title: 'Patients examined at camp',
    source: 'Clinic outreach story',
    position: '50% 57%',
    zoom: 1.78,
    size: 'wide',
  },
  {
    title: 'Correct treatment protects lungs',
    source: 'Pulmonology feature',
    position: '86% 67%',
    zoom: 1.9,
    size: 'feature',
  },
  {
    title: 'Health service camp notice',
    source: 'Public service clipping',
    position: '38% 94%',
    zoom: 2.05,
    size: 'strip',
  },
];

const testimonials = [
  {
    title: 'Asthma plan clarity',
    text:
      'The consultation felt calm and complete. My inhaler technique was corrected, and my asthma plan finally made sense at home.',
    username: 'Asthma patient',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    color: '#FFFF00',
  },
  {
    title: 'Reports explained',
    text:
      'We came with repeated cough and confusing reports. The explanation was patient, direct, and helped us understand the next tests.',
    username: 'Family member',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    color: '#55DB9C',
  },
  {
    title: 'Treatment felt practical',
    text:
      'The treatment was not rushed. Medicines, warning signs, and breathing precautions were explained in language we could follow.',
    username: 'COPD patient',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    color: '#E9CCFF',
  },
  {
    title: 'Organized care',
    text:
      'I liked that every symptom was connected with the reports before deciding treatment. It felt organized and reassuring.',
    username: 'Clinic patient',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    color: '#FB4903',
  },
  {
    title: 'Sleep concern support',
    text:
      'Sleep breathing issues were discussed clearly, including what to track and when to return. The process felt less confusing.',
    username: 'Sleep patient',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    color: '#FFFFFF',
  },
  {
    title: 'Follow-up that helped',
    text:
      'The follow-up helped us know what had improved and what still needed attention. That made long-term care easier.',
    username: 'Follow-up patient',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    color: '#4DA2FF',
  },
  {
    title: 'Clear next steps',
    text:
      'Every visit connected the symptoms with the reports. I left with clear next steps instead of uncertainty.',
    username: 'Respiratory patient',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    color: '#E9CCFF',
  },
  {
    title: 'Family understood',
    text:
      'The explanations were simple enough for the whole family to follow, especially during medicine changes.',
    username: 'Patient family',
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    color: '#FB4903',
  },
  {
    title: 'Cough triggers found',
    text:
      'The clinic helped me understand my cough triggers and what to watch for during seasonal changes.',
    username: 'Cough patient',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    color: '#55DB9C',
  },
  {
    title: 'Breathing plan continued',
    text:
      'The breathing plan was practical and easy to continue after the appointment. That made a big difference.',
    username: 'Ranchi patient',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=520&h=520&dpr=1',
    color: '#FFB347',
  },
];

function Logo() {
  return (
    <a className="brand" href="#" aria-label="Dr. Apoorv Sinha home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 72 72" role="img">
          <path className="mark-blue" d="M34 10v49c-6.7 3.4-18.9 5.8-24.1.8-4.8-4.6-2.3-15.7.2-23.7 2.5-8.1 7.1-19 15-16.4 3.1 1 5.1 4 6.3 7" />
          <path className="mark-coral" d="M38 10v49c6.7 3.4 18.9 5.8 24.1.8 4.8-4.6 2.3-15.7-.2-23.7-2.5-8.1-7.1-19-15-16.4-3.1 1-5.1 4-6.3 7" />
          <path className="mark-blue" d="M31 37c-5.4.6-9.8 3.1-13.1 7.5M31 30c-4.9-1.5-8.5-4.4-10.7-8.8M26 40c.6 4-.2 7.7-2.3 11.1" />
          <path className="mark-coral" d="M41 37c5.4.6 9.8 3.1 13.1 7.5M41 30c4.9-1.5 8.5-4.4 10.7-8.8M46 40c-.6 4 .2 7.7 2.3 11.1" />
        </svg>
      </span>
      <span>
        <strong>DR. APOORV SINHA</strong>
        <small>Pulmonologist <span></span> Respiratory Medicine</small>
      </span>
    </a>
  );
}

function DifferenceSection() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const nextProgress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(nextProgress);
    };

    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const tiles = useMemo(() => {
    let imageIndex = 0;

    return Array.from({ length: 49 }, (_, index) => {
      const isCenter = index === 24;
      const isPhoto = photoTileIndexes.has(index);

      if (isPhoto) {
        const photo = afterScrollPhotos[imageIndex % afterScrollPhotos.length];
        imageIndex += 1;
        return { id: index, type: 'photo', isCenter, ...photo };
      }

      return {
        id: index,
        type: 'color',
        isCenter,
        color: isCenter ? '#0799aa' : mosaicPalette[(index * 2) % mosaicPalette.length],
      };
    });
  }, []);

  const collapse = Math.min(1, Math.max(0, (progress - 0.1) / 0.34));
  const reveal = Math.min(1, Math.max(0, (progress - 0.34) / 0.42));
  const copySwap = Math.min(1, Math.max(0, (progress - 0.42) / 0.22));
  const beforeScale = 1 - collapse * 0.86;
  const beforeOpacity = 1 - reveal * 0.95;

  return (
    <section className="difference-track" id="difference" ref={sectionRef} aria-labelledby="difference-title">
      <div className="difference-anchor" id="difference-after-anchor" aria-hidden="true"></div>
      <div className="difference-stage">
        <div className="difference-inner">
          <div className="section-kicker">After the first visit</div>

          <div className="difference-layout" style={{ '--hours-progress': copySwap }}>
            <div className="mosaic-stage" style={{ '--before-scale': beforeScale, '--before-opacity': beforeOpacity }}>
              <div className="mosaic-grid" aria-hidden="true">
                {tiles.map((tile, index) => {
                  const distanceFromCenter = Math.abs((index % 7) - 3) + Math.abs(Math.floor(index / 7) - 3);
                  const tileReveal = Math.min(1, Math.max(0, reveal * 1.5 - distanceFromCenter * 0.13));

                  return (
                    <div
                      className={`mosaic-tile ${tile.type === 'photo' ? 'photo-tile' : 'color-tile'}`}
                      key={tile.id}
                      style={{
                        '--tile-reveal': tileReveal,
                        backgroundColor: tile.type === 'color' ? tile.color : undefined,
                      }}
                    >
                      {tile.type === 'photo' ? <img src={tile.src} alt="" /> : null}
                    </div>
                  );
                })}
              </div>
              <figure className="before-photo">
                <img src={beforeScrollPhoto.src} alt={beforeScrollPhoto.alt} />
              </figure>
            </div>

            <div className="difference-copy doctor-scroll-copy">
              <div className="copy-stack doctor-info-stack" style={{ '--copy-swap': copySwap }}>
                <article className="copy-panel copy-panel-before doctor-intro-panel">
                  <p className="intro-script">Meet Dr. Apoorv Sinha</p>
                  <h2 id="difference-title">Pulmonologist in Ranchi</h2>
                  <p>
                    Dr. Apoorv Sinha is an MBBS, MD pulmonologist practicing in Bariatu, Ranchi, with a focus on asthma, COPD, TB, allergy, cough, breathlessness, and sleep-related breathing concerns.
                  </p>
                  <p>
                    Public clinic listings note his MD in Pulmonary Medicine from SRMS IMS, Bareilly, and describe his TB, Allergy & Chest Clinic as a respiratory care setup near RIMS/Medical Chowk and Bariatu.
                  </p>
                  <p>
                    Patients often look for him when they need specialist chest care, clear explanations, pulmonary testing guidance, and follow-up for recurring breathing symptoms.
                  </p>
                </article>
                <article className="copy-panel copy-panel-after opening-hours-panel">
                  <div className="hours-card">
                    <div className="hours-card-top">
                      <div>
                        <p className="hours-script">We are for you</p>
                        <h2>Opening Hours</h2>
                      </div>
                      <Clock size={58} strokeWidth={1.7} />
                    </div>
                    <dl className="hours-list">
                      {clinicHours.map(([day, time]) => (
                        <div className="hours-row" key={day}>
                          <dt>{day}</dt>
                          <dd>{time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div className="difference-footer">
            <span>02 / Doctor profile</span>
            <span>Meet the doctor · Opening hours</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TreatmentsSection() {
  return (
    <section className="treatments-section" id="treatments" aria-labelledby="treatments-title">
      <div className="treatments-atmosphere" aria-hidden="true"></div>
      <div className="treatments-inner">
        <div className="treatments-heading">
          <p>Airway, infection, sleep & breathing care</p>
          <h2 id="treatments-title">Pulmonology Treatments</h2>
          <span>
            Scan the main respiratory services quickly. Each card opens with enough context to understand what the visit is for.
          </span>
        </div>

        <div className="treatments-grid" aria-label="Pulmonology treatments">
          {pulmonologyTreatments.map((treatment, index) => (
            <article
              className={`treatment-card ${index < 2 ? 'treatment-card-featured' : ''}`}
              key={treatment.title}
              style={{ '--treatment-accent': treatment.accent }}
            >
              <span className="treatment-number">{String(index + 1).padStart(2, '0')}</span>
              <img src={treatment.src} alt="" loading={index < 6 ? 'eager' : 'lazy'} />
              <div className="treatment-card-copy">
                <span>{treatment.tag}</span>
                <h3>{treatment.title}</h3>
                <p>{treatment.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  return (
    <section className="why-section" id="about" aria-labelledby="why-title">
      <div className="why-flow" aria-hidden="true"></div>
      <div className="why-inner">
        <div className="why-heading">
          <p>Why patients choose this clinic</p>
          <h2 id="why-title">Care built around every breath.</h2>
        </div>

        <div className="why-layout">
          <div className="why-column why-column-left">
            {whyChooseReasons.slice(0, 3).map(({ icon: Icon, title, text }) => (
              <article className="why-reason" key={title}>
                <span className="why-icon">
                  <Icon size={34} strokeWidth={1.85} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="why-visual" aria-hidden="true">
            <img src={whyLungsUrl} alt="" />
            <div className="why-visual-note">
              <strong>Respiratory care</strong>
              <span>Diagnosis. Treatment. Follow-up.</span>
            </div>
          </div>

          <div className="why-column why-column-right">
            {whyChooseReasons.slice(3).map(({ icon: Icon, title, text }) => (
              <article className="why-reason" key={title}>
                <span className="why-icon">
                  <Icon size={34} strokeWidth={1.85} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;
    if (window.matchMedia('(max-width: 760px)').matches) return undefined;

    const slides = [...wrapper.children];

    const preventSelect = (event) => event.preventDefault();
    wrapper.addEventListener('selectstart', preventSelect);
    wrapper.style.userSelect = 'none';
    wrapper.style.webkitUserSelect = 'none';
    wrapper.style.touchAction = 'pan-y';

    const slider = new Core(wrapper, {
      infinite: false,
      snap: false,
      variableWidth: true,
      lerpFactor: 0.02,
      speedDecay: 0.97,
      bounceLimit: 0,
      setOffset: ({ itemWidth, totalWidth }) => {
        const gap = window.innerWidth * 0.02;
        const lastSlideOffset = (testimonials.length - 1) * (itemWidth + gap);
        return totalWidth - lastSlideOffset;
      },
      onUpdate: (instance) => {
        const vwOffset = window.innerWidth * 0.1;

        slides.forEach((slide, index) => {
          const slideWidth = slide.offsetWidth;
          const slideLeft = slide.offsetLeft + instance.current;
          const bgColor = testimonials[index].color;
          const isLast = index === testimonials.length - 1;

          if (slideLeft < 0 && !isLast) {
            const ratio = Math.min(1, Math.abs(slideLeft) / slideWidth);
            slide.style.cssText = `
              background-color: ${bgColor};
              border: 2px solid rgba(0,0,0,0.6);
              transform-origin: left 80%;
              transform: translateX(${instance.current + Math.abs(slideLeft) + ratio * vwOffset}px) rotate(${-15 * ratio}deg) scale(${1 - ratio * 0.4});
              position: relative;
              z-index: ${index + 1};
            `;
          } else {
            slide.style.cssText = `
              background-color: ${bgColor};
              border: 2px solid rgba(0, 0, 0, 0.6);
              transform: translateX(${instance.current}px);
              z-index: ${index + 1};
            `;
          }
        });
      },
    });

    let animId;
    let wasDragging = false;
    let momentum = 0;
    const momentumMultiplier = 10;
    const momentumDecay = 0.96;

    function animate() {
      slider.update();

      if (slider.isDragging) {
        wasDragging = true;
        momentum = 0;
      } else if (wasDragging) {
        momentum = slider.speed * momentumMultiplier;
        wasDragging = false;
      }

      if (Math.abs(momentum) > 0.5) {
        slider.target += momentum;
        momentum *= momentumDecay;
        slider.target = Math.max(slider.maxScroll, Math.min(0, slider.target));
      }

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      wrapper.removeEventListener('selectstart', preventSelect);
      slider.destroy();
    };
  }, []);

  return (
    <section className="testimonial-swiper" aria-labelledby="testimonials-title">
      <div className="testimonial-swiper-copy">
        <span className="testimonial-sticker" aria-hidden="true">
          <i></i>
          <b></b>
        </span>
        <h2 id="testimonials-title">
          Don&apos;t just
          <br />
          believe us?
        </h2>
        <p>Pulmonology patients, in their own words.</p>
        <a href="#appointment" className="testimonial-cta">Book a visit</a>
      </div>

      <div className="testimonial-swiper-window">
        <div className="testimonial-swiper-track" ref={wrapperRef}>
          {testimonials.map((testimonial, index) => (
            <article
              className="testimonial-swiper-card"
              key={`${testimonial.username}-${index}`}
              style={{
                backgroundColor: testimonial.color,
                border: '2px solid rgba(0, 0, 0, 0.6)',
              }}
            >
              <div className="testimonial-card-photo">
                <img src={testimonial.image} alt="" loading="lazy" />
              </div>
              <div className="testimonial-card-person">
                <div>
                  <strong>{testimonial.title}</strong>
                  <span>{testimonial.username}</span>
                </div>
              </div>
              <p>{testimonial.text}</p>
              <p>{testimonial.username}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PressSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = pressClippings.length;
  const pressLoop = [...pressClippings, ...pressClippings];

  useEffect(() => {
    if (isPaused || total < 2) return undefined;

    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % total);
    }, 1200);

    return () => clearInterval(timer);
  }, [isPaused, total]);

  return (
    <section
      className="medical-highlights-section"
      id="press"
      aria-labelledby="press-title"
    >
      <img className="medical-latest-motif medical-latest-lung" src={lungsUrl} alt="" aria-hidden="true" />
      <img className="medical-latest-motif medical-latest-doctor" src={doctorUrl} alt="" aria-hidden="true" />

      <div className="medical-whats-shell">
        <header className="medical-whats-header">
          <h2>
            In The News
            <span>Dr. Apoorv Sinha</span>
          </h2>
          <a className="medical-all-link" href="/gallery">
            View All Coverage
          </a>
        </header>
      </div>

      <div
        className="medical-highlights-inner"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
      >
        <div className="medical-image-column" aria-hidden="true">
          <div className="medical-image-deck">
            {pressClippings.map((item, index) => {
              const depth = (index - activeIndex + total) % total;

              return (
                <figure
                  className="medical-image-card"
                  key={item.title}
                  style={{
                    '--deck-depth': depth,
                    '--clip-position': item.position,
                    '--clip-zoom': item.zoom,
                    zIndex: total - depth,
                  }}
                  onMouseEnter={() => {
                    setActiveIndex(index);
                    setIsPaused(true);
                  }}
                  onClick={() => {
                    window.location.href = '/gallery';
                  }}
                >
                  <img src={pressClippingsUrl} alt="" />
                </figure>
              );
            })}
          </div>
        </div>

        <div className="medical-latest-content">
          <header className="medical-latest-heading">
            <span className="medical-heading-emblem" aria-hidden="true">
              <NewspaperIcon />
            </span>
            <div>
              <p>THE LATEST</p>
              <h2 id="press-title">HIGHLIGHTS</h2>
            </div>
          </header>

          <nav className="medical-headline-list" aria-label="Press coverage highlights">
            {pressClippings.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <a
                  className="medical-headline-link"
                  href="/gallery"
                  key={item.title}
                  aria-current={isActive ? 'true' : undefined}
                  data-active={isActive ? 'true' : 'false'}
                  data-paused={isPaused ? 'true' : 'false'}
                  onMouseEnter={() => {
                    setActiveIndex(index);
                    setIsPaused(true);
                  }}
                  onFocus={() => {
                    setActiveIndex(index);
                    setIsPaused(true);
                  }}
                >
                  <span>{item.title}</span>
                  {isActive && <span className="medical-headline-progress" aria-hidden="true" />}
                </a>
              );
            })}
          </nav>

          <a className="medical-news-button" href="/gallery">
            VIEW FULL GALLERY
          </a>
        </div>
      </div>

      <div className="medical-support-grid" aria-label="Press and public respiratory updates">
        <article className="medical-support-card medical-camp-card">
          <div className="medical-card-head">
            <span className="medical-card-icon"><CalendarCheck size={38} strokeWidth={1.9} /></span>
            <h3>Health Camp Notes</h3>
          </div>
          <div className="medical-events-list">
            {pressClippings.slice(0, 3).map((item, index) => (
              <a className="medical-event-item" href="/gallery" key={item.title}>
                <span className="medical-event-date">
                  <small>{index === 0 ? 'Dec' : index === 1 ? 'Mar' : 'Asthma'}</small>
                  <strong>{index === 2 ? 'Aw' : String(index + 1).padStart(2, '0')}</strong>
                  <small>{index === 2 ? 'areness' : 'Press'}</small>
                </span>
                <span className="medical-event-copy">
                  <strong>{item.title}</strong>
                  <em>{item.source}</em>
                  <small>Open coverage archive</small>
                </span>
              </a>
            ))}
          </div>
          <a className="medical-outline-button" href="/gallery">View All Camps</a>
        </article>

        <article className="medical-support-card medical-notice-card">
          <div className="medical-card-head">
            <span className="medical-card-icon"><Stethoscope size={42} strokeWidth={1.85} /></span>
            <h3>Respiratory Awareness</h3>
          </div>
          <div className="medical-notice-list">
            {[
              'Correct asthma treatment protects long-term breathing.',
              'Patients should not ignore chronic cough or breathlessness.',
              'Camp reports show active respiratory screening in Ranchi.',
            ].map((item, index) => (
              <a className="medical-notice-item" href="/gallery" key={item}>
                <span className="medical-notice-date">
                  <strong>{String(index + 1).padStart(2, '0')}</strong>
                  <small>Note</small>
                </span>
                <span className="medical-notice-copy">
                  <em>Pulmonology</em>
                  <strong>{item}</strong>
                  <small>Read related clipping</small>
                </span>
              </a>
            ))}
          </div>
          <a className="medical-text-button" href="/gallery">View Awareness Notes</a>
        </article>

        <article className="medical-support-card medical-archive-card">
          <div className="medical-card-head">
            <span className="medical-card-icon"><ClipboardCheck size={40} strokeWidth={1.85} /></span>
            <h3>Press Archive</h3>
          </div>
          <div className="medical-archive-feature">
            <div className="medical-archive-track" aria-label="Newspaper archive preview">
              {pressLoop.map((item, index) => (
                <a
                  className="medical-archive-slide"
                  href="/gallery"
                  key={`${item.title}-${index}`}
                  aria-hidden={index >= pressClippings.length ? 'true' : undefined}
                  tabIndex={index >= pressClippings.length ? -1 : undefined}
                  style={{
                    '--clip-position': item.position,
                    '--clip-zoom': item.zoom,
                  }}
                >
                  <span className="medical-archive-cover">
                    <img src={pressClippingsUrl} alt="" />
                  </span>
                  <strong>{item.title}</strong>
                  <span>View clipping</span>
                </a>
              ))}
            </div>
          </div>
          <a className="medical-subscribe-strip" href="/gallery">
            <img src={lungsUrl} alt="" aria-hidden="true" />
            <span>Newspaper coverage, clinic reports, and community respiratory work.</span>
          </a>
        </article>
      </div>
    </section>
  );
}

function NewspaperIcon() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-hidden="true">
      <rect x="10" y="13" width="44" height="38" rx="4" />
      <path d="M18 23h16M18 31h28M18 39h20" />
      <path d="M39 22h7v7h-7z" />
    </svg>
  );
}

function GalleryPage() {
  return (
    <main className="gallery-page">
      <header className="gallery-header">
        <Logo />
        <a className="press-gallery-link" href="/">
          <ArrowLeft size={20} strokeWidth={2.2} />
          <span>Back to site</span>
        </a>
      </header>

      <section className="gallery-hero" aria-labelledby="gallery-title">
        <p>Press archive</p>
        <h1 id="gallery-title">Newspaper coverage & clinic moments.</h1>
        <span>Replace these cropped placeholders with individual newspaper images whenever the final scans are ready.</span>
      </section>

      <section className="gallery-grid" aria-label="Newspaper gallery">
        {pressClippings.map((clipping, index) => (
          <figure
            className={`gallery-card gallery-card-${clipping.size}`}
            key={clipping.title}
            style={{
              '--clip-position': clipping.position,
              '--clip-zoom': clipping.zoom,
            }}
          >
            <img src={pressClippingsUrl} alt="" />
            <figcaption>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{clipping.title}</strong>
              <em>{clipping.source}</em>
            </figcaption>
          </figure>
        ))}
      </section>
    </main>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer" id="clinic">
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo />
          <p>
            Pulmonology consultation for asthma, COPD, TB, chronic cough, allergies, breathlessness, and sleep-related breathing concerns in Ranchi.
          </p>
        </div>

        <div className="footer-links" aria-label="Footer navigation">
          <a href="#about">About doctor</a>
          <a href="#treatments">Treatments</a>
          <a href="#press">News coverage</a>
          <a href="/gallery">Gallery</a>
        </div>

        <div className="footer-actions">
          <a className="footer-cta" href="#appointment">
            <CalendarCheck size={19} strokeWidth={2.2} />
            <span>Book appointment</span>
          </a>
          <a className="footer-map" href="https://www.google.com/maps/search/?api=1&query=TB%2C%20Allergy%20%26%20Chest%20Clinic%20Bariatu%20Ranchi" target="_blank" rel="noreferrer">
            <MapPin size={18} strokeWidth={2.2} />
            <span>Bariatu, Ranchi</span>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Dr. Apoorv Sinha</span>
        <span>Pulmonologist · Respiratory Medicine</span>
      </div>
    </footer>
  );
}

function MainPage() {
  return (
    <>
      <main className="page-shell">
        <header className="site-header">
          <Logo />
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#about">About</a>
            <a href="#conditions">Conditions</a>
            <a href="#treatments">Treatments</a>
            <a href="#clinic">Clinic</a>
          </nav>
          <a className="nav-cta" href="#appointment">
            <CalendarCheck size={20} strokeWidth={2.2} />
            <span>Book appointment</span>
          </a>
          <button className="menu-btn" type="button" aria-label="Open menu">
            <Menu size={42} strokeWidth={2.2} />
          </button>
        </header>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Chest care in Ranchi</p>
            <h1 id="hero-title">
              Helping you
              <br />
              breathe better,
            </h1>
            <p className="hero-subtitle">with care you can understand.</p>
            <p className="hero-body">
              Asthma, COPD, tuberculosis, chronic cough, allergies and sleep-related breathing concerns.
            </p>

            <div className="hero-meta" aria-label="Practice summary">
              <span>Pulmonologist in Ranchi</span>
              <i aria-hidden="true"></i>
              <span>Asthma · COPD · TB</span>
              <i aria-hidden="true"></i>
              <span>Bariatu clinic</span>
            </div>

            <div className="hero-actions">
              <a className="primary-btn" href="#appointment">
                <CalendarCheck size={21} strokeWidth={2.2} />
                <span>Book appointment</span>
              </a>
              <a className="secondary-btn" href="#treatments">
                <Stethoscope size={21} strokeWidth={2.1} />
                <span>View treatments</span>
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="aura aura-one"></div>
            <div className="aura aura-two"></div>
            <img className="lungs" src={lungsUrl} alt="" />
            <img className="doctor" src={doctorUrl} alt="" />
          </div>
        </section>

        <section className="quick-panel" aria-label="Quick links">
          <a href="#concern">
            <Activity size={24} strokeWidth={1.9} />
            <span>Breathing problem?</span>
            <ChevronRight size={20} strokeWidth={2} />
          </a>
          <a href="#conditions">
            <Stethoscope size={24} strokeWidth={1.9} />
            <span>See conditions</span>
            <ChevronRight size={20} strokeWidth={2} />
          </a>
          <a href="#clinic">
            <Clock size={24} strokeWidth={1.9} />
            <span>Clinic & timings</span>
            <ChevronRight className="mobile-chevron" size={20} strokeWidth={2} />
            <MapPin size={20} strokeWidth={2} />
          </a>
        </section>
      </main>
      <DifferenceSection />
      <TreatmentsSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <PressSection />
      <SiteFooter />
    </>
  );
}

function App() {
  return window.location.pathname.startsWith('/gallery') ? <GalleryPage /> : <MainPage />;
}

createRoot(document.getElementById('root')).render(<App />);
