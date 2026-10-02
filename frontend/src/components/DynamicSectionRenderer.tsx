import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Trophy, 
  Star, 
  CheckCircle2, 
  Zap, 
  ExternalLink,
  ShieldCheck,
  Play
} from 'lucide-react';
import GlassCard from './ui/GlassCard';
import Button from './ui/Button';

export interface SectionButton {
  _id?: string;
  id?: string;
  text: string;
  link: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'danger' | 'ghost';
  icon?: string;
  isActive?: boolean;
}

export interface SectionItem {
  _id?: string;
  id?: string;
  title?: string;
  description?: string;
  number?: string;
  label?: string;
  icon?: string;
  image?: string;
  link?: string;
  isActive?: boolean;
}

export interface SectionData {
  _id: string;
  sectionKey?: string;
  page: 'home' | 'about' | 'services' | 'all' | 'custom';
  title?: string;
  subtitle?: string;
  badge?: string;
  content?: string;
  image?: string;
  secondaryImage?: string;
  videoUrl?: string;
  layout?: 'standard' | 'split_right' | 'split_left' | 'banner' | 'centered_cta' | 'grid' | 'features';
  theme?: 'dark' | 'glass' | 'light' | 'accent';
  order?: number;
  isActive?: boolean;
  isDeletable?: boolean;
  buttons?: SectionButton[];
  items?: SectionItem[];
}

interface Props {
  section: SectionData;
  className?: string;
}

export const DynamicSectionRenderer: React.FC<Props> = ({ section, className = "" }) => {
  if (section.isActive === false) return null;

  const activeButtons = (section.buttons || []).filter(b => b.isActive !== false);
  const activeItems = (section.items || []).filter(i => i.isActive !== false);

  const getButtonVariant = (v?: string): 'primary' | 'glass' | 'ghost' | 'secondary' | 'destructive' => {
    switch(v) {
      case 'outline': return 'glass';
      case 'secondary': return 'secondary';
      case 'ghost': return 'ghost';
      case 'danger': return 'destructive';
      default: return 'primary';
    }
  };

  const renderButtons = () => {
    if (activeButtons.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-4 pt-4 items-center">
        {activeButtons.map((btn, idx) => {
          const isExternal = btn.link.startsWith('http://') || btn.link.startsWith('https://');
          const buttonElement = (
            <Button
              key={btn._id || btn.id || idx}
              variant={getButtonVariant(btn.variant)}
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className={btn.variant === 'accent' ? '!bg-gradient-to-r !from-amber-400 !to-yellow-600 !text-black font-bold border-none shadow-lg shadow-amber-500/20 hover:scale-105 transition-all' : btn.variant === 'outline' ? 'border border-[#00E5FF]/40 text-[#00E5FF]' : ''}
            >
              {btn.text}
            </Button>
          );

          if (isExternal) {
            return (
              <a key={btn._id || btn.id || idx} href={btn.link} target="_blank" rel="noopener noreferrer">
                {buttonElement}
              </a>
            );
          }

          return (
            <Link key={btn._id || btn.id || idx} to={btn.link}>
              {buttonElement}
            </Link>
          );
        })}
      </div>
    );
  };

  // BANNER / HERO LAYOUT
  if (section.layout === 'banner' || section.layout === 'centered_cta') {
    return (
      <section className={`py-24 md:py-32 relative overflow-hidden border-t border-white/10 ${section.theme === 'glass' ? 'bg-[#050708]' : 'bg-[#000000]'} ${className}`}>
        <div className="satyam-container relative z-10">
          <GlassCard variant="floating" className="!p-8 md:!p-16 border-white/20 relative overflow-hidden">
            {section.image && (
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <img src={section.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
              </div>
            )}
            
            <div className={`relative z-10 ${section.layout === 'centered_cta' ? 'text-center max-w-3xl mx-auto space-y-6' : 'grid grid-cols-1 lg:grid-cols-12 gap-10 items-center'}`}>
              
              <div className={section.layout === 'centered_cta' ? 'space-y-6' : 'lg:col-span-8 space-y-6'}>
                {section.badge && (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-[10px] font-bold uppercase tracking-[0.25em]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{section.badge}</span>
                  </div>
                )}

                {section.title && (
                  <h2 className="heading-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                    {section.title}
                  </h2>
                )}

                {section.subtitle && (
                  <p className="editorial-subhead text-sm sm:text-lg text-white/70 max-w-2xl font-normal leading-relaxed">
                    {section.subtitle}
                  </p>
                )}

                {section.content && (
                  <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl">
                    {section.content}
                  </p>
                )}

                {section.layout !== 'centered_cta' && renderButtons()}
              </div>

              {section.layout === 'centered_cta' && (
                <div className="flex justify-center pt-4">
                  {renderButtons()}
                </div>
              )}

              {section.layout !== 'centered_cta' && activeButtons.length > 0 && (
                <div className="lg:col-span-4 flex justify-start lg:justify-end">
                  {/* Additional CTA column spacing if needed */}
                </div>
              )}

            </div>
          </GlassCard>
        </div>
      </section>
    );
  }

  // FEATURES / GRID LAYOUT
  if (section.layout === 'features' || section.layout === 'grid') {
    return (
      <section className={`py-24 md:py-32 relative overflow-hidden border-t border-white/10 ${section.theme === 'glass' ? 'bg-[#050708]' : 'bg-[#000000]'} ${className}`}>
        <div className="satyam-container relative z-10">
          
          <div className="max-w-3xl mb-16 space-y-4">
            {section.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-[10px] font-bold uppercase tracking-[0.25em]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{section.badge}</span>
              </div>
            )}
            {section.title && (
              <h2 className="heading-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
                {section.title}
              </h2>
            )}
            {section.subtitle && (
              <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                {section.subtitle}
              </p>
            )}
          </div>

          {activeItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeItems.map((item, i) => (
                <GlassCard key={item._id || item.id || i} variant="subtle" className="p-8 border-white/10 hover:border-[#00E5FF]/40 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] mb-6">
                    {i % 2 === 0 ? <Sparkles className="w-6 h-6" /> : <Trophy className="w-6 h-6" />}
                  </div>
                  {item.title && (
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  )}
                  {item.description && (
                    <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                  )}
                  {item.number && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-3xl font-extrabold text-white">{item.number}</p>
                      {item.label && <p className="text-xs uppercase tracking-widest text-[#00E5FF] mt-1">{item.label}</p>}
                    </div>
                  )}
                </GlassCard>
              ))}
            </div>
          )}

          {renderButtons()}

        </div>
      </section>
    );
  }

  // STANDARD SPLIT LAYOUT (split_right / split_left / standard)
  const isSplitLeft = section.layout === 'split_left';

  return (
    <section className={`py-24 md:py-36 relative overflow-hidden border-t border-white/10 ${section.theme === 'glass' ? 'bg-[#050708]' : 'bg-[#000000]'} ${className}`}>
      <div className="satyam-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: isSplitLeft ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`space-y-8 ${isSplitLeft ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7'}`}
          >
            {section.badge && (
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-subtle text-[10px] font-bold uppercase tracking-[0.3em] text-[#00E5FF]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{section.badge}</span>
              </div>
            )}

            {section.title && (
              <h2 className="heading-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-white">
                {section.title}
              </h2>
            )}

            {section.subtitle && (
              <p className="editorial-subhead text-base sm:text-xl text-white/70 font-normal leading-relaxed">
                {section.subtitle}
              </p>
            )}

            {section.content && (
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                {section.content}
              </p>
            )}

            {/* Statistics / Sub-items */}
            {activeItems.length > 0 && (
              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/10 max-w-md">
                {activeItems.map((item, idx) => (
                  <div key={item._id || item.id || idx}>
                    {item.number ? (
                      <>
                        <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-1">
                          {item.number}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00E5FF]">
                          {item.label || item.title}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-lg font-bold text-white mb-1">{item.title}</p>
                        <p className="text-xs text-white/60">{item.description}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {renderButtons()}
          </motion.div>

          {/* Image / Media Content */}
          {section.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`lg:col-span-5 ${isSplitLeft ? 'lg:order-1' : ''}`}
            >
              <GlassCard variant="strong" className="!p-4 border-white/20">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900">
                  <img
                    src={section.image}
                    alt={section.title || "Section Media"}
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
              </GlassCard>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};

export default DynamicSectionRenderer;
