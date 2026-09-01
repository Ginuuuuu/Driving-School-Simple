import React, { useState } from 'react';
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram } from 'react-icons/fa';
import {
  Star,
  ShieldCheck,
  Globe,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Instructor, TeamMember } from '../../types';
import { Button } from '../common/Button';
import { defaultInstructors } from '../../content/instructors';

interface TeamShowcaseProps {
  instructors?: Instructor[];
  members?: TeamMember[];
  onSelectInstructor?: (instructorId?: string) => void;
}

export const TeamShowcase: React.FC<TeamShowcaseProps> = ({
  instructors,
  members,
  onSelectInstructor,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Normalize instructors & ensure 6 primary mentors for the desktop showcase
  const displayInstructors: Instructor[] = React.useMemo(() => {
    if (instructors && instructors.length > 0) return instructors;
    return defaultInstructors;
  }, [instructors]);

  const displayMembers: (TeamMember & { fullInstructor?: Instructor })[] = React.useMemo(() => {
    // Prioritize displayInstructors so desktop matches the driving school mentors
    if (displayInstructors && displayInstructors.length > 0) {
      return displayInstructors.slice(0, 6).map((inst) => ({
        id: inst.id,
        name: inst.name,
        role: inst.role,
        image: inst.photoUrl,
        social: { twitter: '#', linkedin: '#' },
        fullInstructor: inst,
      }));
    }
    if (members && members.length > 0) {
      return members.slice(0, 6).map((m, idx) => ({
        ...m,
        image: m.image || defaultInstructors[idx % defaultInstructors.length].photoUrl,
        fullInstructor: displayInstructors[idx % displayInstructors.length],
      }));
    }
    return defaultInstructors.slice(0, 6).map((inst) => ({
      id: inst.id,
      name: inst.name,
      role: inst.role,
      image: inst.photoUrl,
      social: { twitter: '#', linkedin: '#' },
      fullInstructor: inst,
    }));
  }, [members, displayInstructors]);

  // Desktop 3 staggered columns
  const col1 = displayMembers.filter((_, i) => i % 3 === 0);
  const col2 = displayMembers.filter((_, i) => i % 3 === 1);
  const col3 = displayMembers.filter((_, i) => i % 3 === 2);

  // Mobile selected state
  const [mobileSelectedId, setMobileSelectedId] = useState<string>(
    displayInstructors[0]?.id || 'inst-1'
  );
  const activeMobileInstructor =
    displayInstructors.find((i) => i.id === mobileSelectedId) ||
    displayInstructors[0];

  return (
    <div className="w-full select-none font-sans">
      {/* ── DESKTOP VIEW (md and up): EXACT PREVIOUS OFFSET 3-COLUMNS + NAME LIST ── */}
      <div className="hidden md:flex flex-row items-start gap-8 md:gap-10 lg:gap-14 w-full max-w-5xl mx-auto py-6 md:py-8 px-4 md:px-6">
        {/* Left: 3 staggered photo columns */}
        <div className="flex gap-2 md:gap-3 flex-shrink-0">
          {/* Column 1 */}
          <div className="flex flex-col gap-2 md:gap-3">
            {col1.map((member) => (
              <PhotoCard
                key={member.id}
                member={member}
                className="w-[110px] h-[120px] sm:w-[130px] sm:h-[140px] md:w-[155px] md:h-[165px]"
                hoveredId={hoveredId}
                onHover={setHoveredId}
                onClick={() => onSelectInstructor?.(member.id)}
              />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-2 md:gap-3 mt-[48px] sm:mt-[56px] md:mt-[68px]">
            {col2.map((member) => (
              <PhotoCard
                key={member.id}
                member={member}
                className="w-[122px] h-[132px] sm:w-[145px] sm:h-[155px] md:w-[172px] md:h-[182px]"
                hoveredId={hoveredId}
                onHover={setHoveredId}
                onClick={() => onSelectInstructor?.(member.id)}
              />
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-2 md:gap-3 mt-[22px] sm:mt-[26px] md:mt-[32px]">
            {col3.map((member) => (
              <PhotoCard
                key={member.id}
                member={member}
                className="w-[115px] h-[125px] sm:w-[136px] sm:h-[146px] md:w-[162px] md:h-[172px]"
                hoveredId={hoveredId}
                onHover={setHoveredId}
                onClick={() => onSelectInstructor?.(member.id)}
              />
            ))}
          </div>
        </div>

        {/* Right: member name list */}
        <div className="flex flex-col gap-4 md:gap-5 pt-0 md:pt-2 flex-1 w-full">
          {displayMembers.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
              hoveredId={hoveredId}
              onHover={setHoveredId}
              onClick={() => onSelectInstructor?.(member.id)}
            />
          ))}
        </div>
      </div>

      {/* ── MOBILE VIEW (< md): CLEAN TOUCH-FRIENDLY MENTOR CAROUSEL & SPOTLIGHT ── */}
      <div className="block md:hidden space-y-4">
        {/* Horizontal Mentor Avatar Strip */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs px-1 text-slate-600">
            <span className="font-bold text-slate-800">Tap to Switch Mentor:</span>
            <span className="text-[0.7rem] text-slate-400">← Swipe mentors →</span>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 -mx-4 px-4 snap-x snap-mandatory scrollbar-none">
            {displayInstructors.map((inst) => {
              const isSelected = inst.id === activeMobileInstructor.id;

              return (
                <button
                  key={inst.id}
                  type="button"
                  onClick={() => setMobileSelectedId(inst.id)}
                  className={`flex flex-col items-center gap-1.5 shrink-0 snap-center p-2 rounded-2xl transition-all duration-200 cursor-pointer min-w-[76px] ${
                    isSelected
                      ? 'bg-[#F4C400]/15 border-2 border-[#082B4C] shadow-sm scale-105'
                      : 'bg-white border border-[#E5E7EB] opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#E5E7EB]">
                    <img
                      src={inst.photoUrl}
                      alt={inst.name}
                      className="w-full h-full object-cover object-top"
                    />
                    {isSelected && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#082B4C] border-2 border-white rounded-full" />
                    )}
                  </div>

                  <span
                    className={`text-[0.68rem] font-bold text-center leading-tight truncate w-16 ${
                      isSelected ? 'text-[#082B4C] font-extrabold' : 'text-[#6B7280]'
                    }`}
                  >
                    {inst.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Mentor Mobile Card */}
        <div className="rounded-2xl bg-white border border-[#E5E7EB] shadow-sm overflow-hidden">
          {/* Header Photo Banner */}
          <div className="relative h-44 w-full bg-[#F5F6F7]">
            <img
              src={activeMobileInstructor.photoUrl}
              alt={activeMobileInstructor.name}
              className="w-full h-full object-cover object-[center_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#082B4C]/80 via-transparent to-transparent" />

            {/* Rating Pill */}
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 text-[#202B33] text-[0.72rem] font-extrabold shadow-sm">
              <Star className="w-3 h-3 fill-[#F4C400] text-[#F4C400]" />
              <span>{activeMobileInstructor.rating.toFixed(2)}</span>
              <span className="text-[0.62rem] text-[#6B7280] font-normal">
                ({activeMobileInstructor.studentCount}+)
              </span>
            </div>

            {/* Experience Badge */}
            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-[#082B4C] text-white font-bold text-[0.68rem] shadow-xs flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {activeMobileInstructor.experienceYears}+ Yrs Coaching
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-3.5 space-y-2.5">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-base font-bold font-display text-[#202B33] leading-tight">
                {activeMobileInstructor.name}
              </h3>
              <span className="text-[0.7rem] font-bold text-[#082B4C] truncate shrink-0">
                {activeMobileInstructor.role.split('&')[0]}
              </span>
            </div>

            {/* Specialties & Languages */}
            <div className="flex flex-wrap items-center gap-1 pt-0.5">
              {activeMobileInstructor.specialties.slice(0, 2).map((spec, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-[#F5F6F7] text-[#202B33] border border-[#E5E7EB] text-[0.68rem] font-medium"
                >
                  {spec}
                </span>
              ))}
              <span className="px-2 py-0.5 rounded-md bg-[#F4C400]/15 text-[#082B4C] border border-[#F4C400]/40 text-[0.68rem] font-medium flex items-center gap-1">
                <Globe className="w-2.5 h-2.5 text-[#082B4C]" />
                {activeMobileInstructor.languages.slice(0, 2).join(', ')}
              </span>
            </div>

            {/* Action Button */}
            <div className="pt-1.5">
              <Button
                variant="primary"
                size="md"
                onClick={() => onSelectInstructor?.(activeMobileInstructor.id)}
                className="w-full justify-center shadow-xs font-bold text-xs py-2.5"
                icon={<Sparkles className="w-3.5 h-3.5 text-[#082B4C]" />}
              >
                Request Lessons with {activeMobileInstructor.name.split(' ')[0]}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   Desktop Photo card 
───────────────────────────────────────── */
function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
  onClick,
}: {
  member: TeamMember & { fullInstructor?: Instructor };
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onClick?: () => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  const [imgError, setImgError] = useState(false);

  const photoSrc = imgError
    ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    : member.image || member.fullInstructor?.photoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80';

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl cursor-pointer flex-shrink-0 transition-all duration-300 relative group bg-slate-100 border border-[#E5E7EB]',
        className,
        isActive ? 'ring-2 ring-[#F4C400] scale-105 z-10 shadow-lg' : '',
        isDimmed ? 'opacity-50 grayscale' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      <img
        src={photoSrc}
        alt={member.name}
        onError={() => setImgError(true)}
        className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
        style={{
          filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.85)',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   Desktop Member name section
───────────────────────────────────────── */
function MemberRow({
  member,
  hoveredId,
  onHover,
  onClick,
}: {
  member: TeamMember & { fullInstructor?: Instructor };
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onClick?: () => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  const hasSocial =
    member.social?.twitter ??
    member.social?.linkedin ??
    member.social?.instagram ??
    member.social?.behance;

  return (
    <div
      className={cn(
        'cursor-pointer transition-opacity duration-300 group',
        isDimmed ? 'opacity-50' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      {/* Name + social*/}
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            'w-4 h-3 rounded-[5px] flex-shrink-0 transition-all duration-300',
            isActive ? 'bg-[#F4C400] w-5' : 'bg-[#6B7280]/30 group-hover:bg-[#F4C400]/60',
          )}
        />
        <span
          className={cn(
            'text-base md:text-[18px] font-semibold leading-none tracking-tight transition-colors duration-300',
            isActive ? 'text-[#082B4C] font-bold' : 'text-[#6B7280] group-hover:text-[#082B4C]',
          )}
        >
          {member.name}
        </span>

        {/* Social icons */}
        {hasSocial && (
          <div
            className={cn(
              'flex items-center gap-1.5 ml-0.5 transition-all duration-200',
              isActive
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2 pointer-events-none',
            )}
          >
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-[#6B7280] hover:text-[#082B4C] hover:bg-[#E5E7EB] transition-all duration-150 hover:scale-110"
                title="X / Twitter"
              >
                <FaTwitter size={10} />
              </a>
            )}
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-[#6B7280] hover:text-[#082B4C] hover:bg-[#E5E7EB] transition-all duration-150 hover:scale-110"
                title="LinkedIn"
              >
                <FaLinkedinIn size={10} />
              </a>
            )}
            {member.social?.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-[#6B7280] hover:text-[#082B4C] hover:bg-[#E5E7EB] transition-all duration-150 hover:scale-110"
                title="Instagram"
              >
                <FaInstagram size={10} />
              </a>
            )}
            {member.social?.behance && (
              <a
                href={member.social.behance}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-[#6B7280] hover:text-[#082B4C] hover:bg-[#E5E7EB] transition-all duration-150 hover:scale-110"
                title="Behance"
              >
                <FaBehance size={10} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Role */}
      <p className="mt-1.5 pl-[27px] text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#082B4C]">
        {member.role}
      </p>
    </div>
  );
}

export default TeamShowcase;

