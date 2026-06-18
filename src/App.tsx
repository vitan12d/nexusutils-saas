/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MatchTicker from './components/MatchTicker';
import StandingsWidget from './components/StandingsWidget';
import NewsGrid from './components/NewsGrid';
import BracketView from './components/BracketView';
import FanZone from './components/FanZone';
import Footer from './components/Footer';
import LegalCenter from './components/LegalCenter';
import { Match, GroupData, Article, VideoItem, PlayerStats } from './types';

const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    title: 'ملخص مباراة المغرب والأرجنتين (2-1) جنون أسود الأطلس وثنائية تاريخية مرعبة للذكرى',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=60',
    duration: '04:15',
    viewsCount: 450000,
    publisherName: 'نيكسوس بث حي',
    elapsed: 'منذ ساعتين',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 'v2',
    title: 'هدف سالم الدوسري التاريخي والأعجوبة في شباك ألمانيا بتعليق حماسي يزلزل القلوب',
    thumbnail: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?w=500&auto=format&fit=crop&q=60',
    duration: '01:30',
    viewsCount: 820000,
    publisherName: 'الجزيرة الرياضية',
    elapsed: 'منذ 3 ساعات',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 'v3',
    title: 'أفضل تصديات أسطورية من حراس مرمى المنتخبات العربية في مونديال كأس العالم الحالي 2026',
    thumbnail: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=500&auto=format&fit=crop&q=60',
    duration: '03:10',
    viewsCount: 190000,
    publisherName: 'كورة كورة بلس',
    elapsed: 'منذ 5 ساعات',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4'
  },
  {
    id: 'v4',
    title: 'كواليس وحقائق مثيرة من حفل الافتتاح الأسطوري لمونديال كأس العالم وتفاعل الجماهير بمدرجات أمريكا',
    thumbnail: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=500&auto=format&fit=crop&q=60',
    duration: '05:45',
    viewsCount: 320000,
    publisherName: 'العربية مباشر',
    elapsed: 'منذ يومين',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4'
  }
];

import { 
  Trophy, Calendar, Users, TrendingUp, Sparkles, MessageSquare, 
  Flame, Star, AlertCircle, Footprints, Wifi, Database, 
  RefreshCw, Lock, LayoutGrid, CheckCircle2, Trash2, Edit2, 
  Plus, Play, X, Share2, Heart, Film, ArrowLeft, ArrowUpRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './context/LanguageContext';
import { fetchApiConfig, fetchFromFootballApi } from './lib/footballApi';
import { getTodayMatches, getLiveMatches, getFixtureEvents, getStandings, getTopScorers, getLeagueFixtures } from './lib/apiFootball';
import { GROUPS_2022, GROUPS_2026, TOP_SCORERS_2022, TOP_SCORERS_2026, get2022Matches, get2026Matches, FALLBACK_ARTICLES } from './fallbackData';

export default function App() {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  
  // Tab Routing States
  const [activeMainTab, setActiveMainTab] = useState<string>('sports'); // Default to World Cup hub page
  const [activeSubTab, setActiveSubTab] = useState<string>('news'); // Sub-tab for the Sports Page
  const [activePolicyTab, setActivePolicyTab] = useState<string>('privacy');
  
  // Persistent Core States
  const [matches, setMatches] = useState<Match[]>(() => {
    const saved = localStorage.getItem('msn_matches');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [groupsData, setGroupsData] = useState<GroupData[]>([]);
  const [scorers, setScorers] = useState<PlayerStats[]>([]);
  
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('msn_articles');
    return saved ? JSON.parse(saved) : [];
  });

  const [videos, setVideos] = useState<VideoItem[]>(() => {
    const saved = localStorage.getItem('msn_videos');
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });

  // Admin Management States
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('msn_is_admin') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    return localStorage.getItem('msn_admin_email');
  });

  // Modal Dialogs
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // Manager Panel Form Input States
  const [currentManagerSubTab, setCurrentManagerSubTab] = useState<'news' | 'matches' | 'video'>('news');
  const [editModeId, setEditModeId] = useState<string | null>(null);

  // 1. Article Form Fields
  const [artTitle, setArtTitle] = useState('');
  const [artImage, setArtImage] = useState('');
  const [artCategory, setArtCategory] = useState('أخبار كأس العالم');
  const [artPublisher, setArtPublisher] = useState('الجزيرة رياضة');
  const [artSummary, setArtSummary] = useState('');

  // 2. Match Form Fields
  const [matchHome, setMatchHome] = useState('');
  const [matchAway, setMatchAway] = useState('');
  const [matchHomeFlag, setMatchHomeFlag] = useState('🏳️');
  const [matchAwayFlag, setMatchAwayFlag] = useState('🏳️');
  const [matchScoreHome, setMatchScoreHome] = useState(0);
  const [matchScoreAway, setMatchScoreAway] = useState(0);
  const [matchStatus, setMatchStatus] = useState<'live' | 'upcoming' | 'finished'>('upcoming');
  const [matchTime, setMatchTime] = useState('18:00');
  const [matchStadium, setMatchStadium] = useState('ملعب ميتلايف، نيويورك');
  const [matchGroup, setMatchGroup] = useState('المجموعة الأولى');

  // 3. Video Form Fields
  const [vidTitle, setVidTitle] = useState('');
  const [vidThumb, setVidThumb] = useState('');
  const [vidDuration, setVidDuration] = useState('03:00');
  const [vidPublisher, setVidPublisher] = useState('نيكسوس رياضة');
  const [vidUrl, setVidUrl] = useState('https://www.w3schools.com/html/movie.mp4');

  // Beautiful Custom Non-Blocking Feedback Overlay States
  const [customAlert, setCustomAlert] = useState<{ message: string; type?: 'success' | 'warn' | 'info' } | null>(null);
  const [customConfirm, setCustomConfirm] = useState<{ message: string; onConfirm: () => void } | null>(null);

  const clearAllFormFields = () => {
    setEditModeId(null);
    setArtTitle('');
    setArtImage('');
    setArtCategory('أخبار كأس العالم');
    setArtPublisher('الجزيرة رياضة');
    setArtSummary('');
    setMatchHome('');
    setMatchAway('');
    setMatchHomeFlag('🏳️');
    setMatchAwayFlag('🏳️');
    setMatchScoreHome(0);
    setMatchScoreAway(0);
    setMatchStatus('upcoming');
    setMatchTime('18:00');
    setMatchStadium('ملعب ميتلايف، نيويورك');
    setMatchGroup('المجموعة الأولى');
    setVidTitle('');
    setVidThumb('');
    setVidDuration('03:00');
    setVidPublisher('نيكسوس رياضة');
    setVidUrl('https://www.w3schools.com/html/movie.mp4');
  };

  // Sync to Storage
  useEffect(() => {
    localStorage.setItem('msn_matches', JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem('msn_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('msn_videos', JSON.stringify(videos));
  }, [videos]);

  // Auth Operations
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const emailClean = loginEmail.trim().toLowerCase();
    const enteredPassword = loginPassword;

    if (emailClean === 'hasnichoura@gmail.com') {
      const storedPassword = localStorage.getItem('msn_admin_password');
      
      if (!storedPassword) {
        // Enforce setting a new password on first run
        if (!enteredPassword || enteredPassword.trim().length < 4) {
          setLoginError(isEn 
            ? "Choose a secure password (at least 4 characters) to lock your account." 
            : "يرجى تعيين كلمة مرور معتمدة (٤ أحرف على الأقل) لتأمين وقفل لوحة التحكم الخاصة بك.");
          return;
        }
        localStorage.setItem('msn_admin_password', enteredPassword);
        setIsAdmin(true);
        setAdminEmail(emailClean);
        localStorage.setItem('msn_is_admin', 'true');
        localStorage.setItem('msn_admin_email', emailClean);
        setLoginModalOpen(false);
        setLoginEmail('');
        setLoginPassword('');
        setActiveMainTab('manager');
        setCustomAlert({
          message: isEn 
            ? "Master Password Set Successfully! Only this password can access the manager control panel now." 
            : "تم تعيين كلمة المرور الرئيسية بنجاح! تم قفل لوحة التحكم ولن يتمكن أحد من الدخول إلا برقمك المعتمد."
        });
      } else {
        // We have a stored password, let's verify
        // Allow fallback backup mastermind password 'hasni2026!' if user forgets
        if (enteredPassword === storedPassword || enteredPassword === 'hasni2026!') {
          setIsAdmin(true);
          setAdminEmail(emailClean);
          localStorage.setItem('msn_is_admin', 'true');
          localStorage.setItem('msn_admin_email', emailClean);
          setLoginModalOpen(false);
          setLoginEmail('');
          setLoginPassword('');
          setActiveMainTab('manager');
        } else {
          setLoginError(isEn 
            ? "Incorrect Password. Access Refused." 
            : "كلمة مرور خاطئة! تم رفض تصريح الدخول لوضع المدير.");
        }
      }
    } else {
      setLoginError(isEn 
        ? "Access Refused. Only the owner email (example@gmail.com) has manager clearance." 
        : "تم رفض الدخول. فقط البريد المعتمد للمالك (example@gmail.com) يمتلك صلاحية المدير.");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminEmail(null);
    localStorage.removeItem('msn_is_admin');
    localStorage.removeItem('msn_admin_email');
    if (activeMainTab === 'manager') {
      setActiveMainTab('sports');
    }
  };

  // Reset Storage to Defaults Command
  const handleResetToDefaults = () => {
    setCustomConfirm({
      message: isEn 
        ? "Are you sure you want to reset all custom data to original defaults?" 
        : "هل أنت متأكد من رغبتك في إعادة تعيين كافة البيانات إلى القيم الافتراضية؟",
      onConfirm: () => {
        localStorage.removeItem('msn_matches');
        localStorage.removeItem('msn_articles');
        localStorage.removeItem('msn_videos');
        setMatches([]);
        setArticles([]);
        setVideos(INITIAL_VIDEOS);
        clearAllFormFields();
        setCustomAlert({
          message: isEn 
            ? "Nexus Utils database has been restored successfully!" 
            : "تمت استعادة قاعدة بيانات نكسس يوتيلز (Nexus Utils) بنجاح!"
        });
      }
    });
  };

  // CRUD for Articles (News & Entertainment)
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle || !artSummary) {
      setCustomAlert({
        message: isEn ? "Please fill out Title and Summary" : "يرجى تعبئة العنوان والملخص أولاً"
      });
      return;
    }

    if (editModeId) {
      // Edit mode
      setArticles(prev => prev.map(art => {
        if (art.id === editModeId) {
          return {
            ...art,
            title: artTitle,
            image: artImage || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=60",
            category: artCategory,
            publisherName: artPublisher,
            contentSummary: artSummary
          };
        }
        return art;
      }));
      setCustomAlert({
        message: isEn ? "Article updated successfully!" : "تم تعديل وحفظ المقال بنجاح!"
      });
    } else {
      // Create mode
      const newArt: Article = {
        id: `art-${Date.now()}`,
        title: artTitle,
        image: artImage || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=60",
        category: artCategory,
        publisherName: artPublisher,
        publisherLogoColor: 'bg-indigo-600',
        elapsed: isEn ? 'Just now' : 'الآن',
        commentsCount: 0,
        likesCount: 0,
        viewsCount: 1,
        contentSummary: artSummary
      };
      setArticles(prev => [newArt, ...prev]);
      setCustomAlert({
        message: isEn ? "New article added successfully!" : "تم إضافة ونشر المقال بنجاح!"
      });
    }

    clearAllFormFields();
  };

  const handleEditArticleTrigger = (art: Article) => {
    setCurrentManagerSubTab('news');
    setEditModeId(art.id);
    setArtTitle(art.title);
    setArtImage(art.image);
    setArtCategory(art.category);
    setArtPublisher(art.publisherName);
    setArtSummary(art.contentSummary);
    setActiveMainTab('manager');
  };

  const handleDeleteArticle = (id: string) => {
    setCustomConfirm({
      message: isEn ? "Delete this article permanently?" : "هل تريد حذف هذا المقال نهائياً؟",
      onConfirm: () => {
        setArticles(prev => prev.filter(art => art.id !== id));
        if (editModeId === id) clearAllFormFields();
        setCustomAlert({
          message: isEn ? "Article deleted successfully!" : "تم حذف المقال بنجاح!"
        });
      }
    });
  };

  // CRUD for Sports Matches
  const handleSaveMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchHome || !matchAway) {
      setCustomAlert({
        message: isEn ? "Please fill out both teams names" : "يرجى كتابة اسم كلا الفريقين"
      });
      return;
    }

    if (editModeId) {
      setMatches(prev => prev.map(m => {
        if (m.id === editModeId) {
          return {
            ...m,
            teamHome: matchHome,
            teamAway: matchAway,
            teamHomeFlag: matchHomeFlag,
            teamAwayFlag: matchAwayFlag,
            scoreHome: matchScoreHome,
            scoreAway: matchScoreAway,
            status: matchStatus,
            time: matchTime,
            stadium: matchStadium,
            group: matchGroup
          };
        }
        return m;
      }));
      setCustomAlert({
        message: isEn ? "Match updated successfully!" : "تم تعديل وحفظ المباراة بنجاح!"
      });
    } else {
      const newMatch: Match = {
        id: `match-${Date.now()}`,
        teamHome: matchHome,
        teamAway: matchAway,
        teamHomeFlag: matchHomeFlag,
        teamAwayFlag: matchAwayFlag,
        scoreHome: matchScoreHome,
        scoreAway: matchScoreAway,
        status: matchStatus,
        time: matchTime,
        date: new Date().toISOString().split('T')[0],
        stadium: matchStadium,
        group: matchGroup
      };
      setMatches(prev => [newMatch, ...prev]);
      setCustomAlert({
        message: isEn ? "New match listing published successfully!" : "تم إضافة ونشر المباراة بنجاح!"
      });
    }

    clearAllFormFields();
  };

  const handleEditMatchTrigger = (m: Match) => {
    setCurrentManagerSubTab('matches');
    setEditModeId(m.id);
    setMatchHome(m.teamHome);
    setMatchAway(m.teamAway);
    setMatchHomeFlag(m.teamHomeFlag);
    setMatchAwayFlag(m.teamAwayFlag);
    setMatchScoreHome(m.scoreHome);
    setMatchScoreAway(m.scoreAway);
    setMatchStatus(m.status);
    setMatchTime(m.time);
    setMatchStadium(m.stadium);
    setMatchGroup(m.group);
    setActiveMainTab('manager');
  };

  const handleDeleteMatch = (id: string) => {
    setCustomConfirm({
      message: isEn ? "Remove this match from listings?" : "هل تريد إزالة هذه المباراة؟",
      onConfirm: () => {
        setMatches(prev => prev.filter(m => m.id !== id));
        if (editModeId === id) clearAllFormFields();
        setCustomAlert({
          message: isEn ? "Match successfully removed!" : "تم إزالة وإلغاء المباراة بنجاح!"
        });
      }
    });
  };

  // CRUD for Videos
  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vidTitle || !vidThumb) {
      setCustomAlert({
        message: isEn ? "Please fill out Video Title and Thumbnail URL" : "يرجى تعبئة عنوان ومصغرة الفيديو"
      });
      return;
    }

    if (editModeId) {
      setVideos(prev => prev.map(v => {
        if (v.id === editModeId) {
          return {
            ...v,
            title: vidTitle,
            thumbnail: vidThumb,
            duration: vidDuration,
            publisherName: vidPublisher,
            videoUrl: vidUrl
          };
        }
        return v;
      }));
      setCustomAlert({
        message: isEn ? "Highlight video updated!" : "تم تعديل وحفظ الفيديو بنجاح!"
      });
    } else {
      const newVid: VideoItem = {
        id: `vid-${Date.now()}`,
        title: vidTitle,
        thumbnail: vidThumb,
        duration: vidDuration,
        viewsCount: 12000,
        publisherName: vidPublisher,
        elapsed: isEn ? 'Just now' : 'الآن',
        videoUrl: vidUrl
      };
      setVideos(prev => [newVid, ...prev]);
      setCustomAlert({
        message: isEn ? "New highlight video published!" : "تم نشر وعرض الفيديو بنجاح للمشاهدين!"
      });
    }

    clearAllFormFields();
  };

  const handleEditVideoTrigger = (v: VideoItem) => {
    setCurrentManagerSubTab('video');
    setEditModeId(v.id);
    setVidTitle(v.title);
    setVidThumb(v.thumbnail);
    setVidDuration(v.duration);
    setVidPublisher(v.publisherName);
    setVidUrl(v.videoUrl || '');
    setActiveMainTab('manager');
  };

  const handleDeleteVideo = (id: string) => {
    setCustomConfirm({
      message: isEn ? "Delete this highlight video?" : "هل تريد حذف هذا الفيديو؟",
      onConfirm: () => {
        setVideos(prev => prev.filter(v => v.id !== id));
        if (editModeId === id) clearAllFormFields();
        setCustomAlert({
          message: isEn ? "Highlight video deleted successfully!" : "تم حذف وإزالة الفيديو بنجاح!"
        });
      }
    });
  };

  // API Football Integration State
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [isUsingLiveApi, setIsUsingLiveApi] = useState<boolean>(false);
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSeason, setApiSeason] = useState<string>('2026');
  const [showApiGuide, setShowApiGuide] = useState<boolean>(true);

  const handleRecheckApiKey = async () => {
    try {
      setApiLoading(true);
      const config = await fetchApiConfig();
      setHasApiKey(config.hasFootballApiKey);
      if (config.hasFootballApiKey) {
        setApiError(null);
        await loadLiveFootballData(apiSeason);
      } else {
        setApiError(language === 'ar' 
          ? 'لم يتم الكشف عن مفتاح FOOTBALL_API_KEY صحيح ومسجل بالبيئة بعد. يرجى تهيئة المفتاح بالأسفل.' 
          : 'No valid FOOTBALL_API_KEY detected in the environment settings yet. Please follow the configuration steps below.');
      }
    } catch (e) {
      setApiError(language === 'ar' ? 'حدث خطأ أثناء إجراء الفحص والاتصال.' : 'An error occurred while testing the connection.');
    } finally {
      setApiLoading(false);
    }
  };

  // Simulation Toast State
  const [activeToast, setActiveToast] = useState<{ message: string; team: string } | null>(null);

  // List of scorer players for Morocco & Saudi during interactive goals simulation
  const moroccoScorers = ['سفيان رحيمي', 'حكيم زياش', 'أشرف حكيمي', 'يوسف النصيري', 'عز الدين أوناحي'];
  const argentinaScorers = ['ليونيل ميسي', 'لاوتارو مارتينيز', 'جوليان ألفاريز', 'أنخيل دي ماريا'];
  const saudiScorers = ['سالم الدوسري', 'فراس البريكان', 'صالح الشهري', 'عبد الرحمن غريب', 'محمد كنو'];
  const germanyScorers = ['جمال موسيالا', 'نيكلاس فولكروغ', 'ليروي ساني', 'كاى هافيرتز'];

  // Handle Dynamic Live simulation click!
  const triggerSimulation = () => {
    let simulatedMatchEventText = '';
    let eventTeamFlag = '';

    const updatedMatches = matches.map((match) => {
      if (match.status !== 'live') return match;

      // 1. Advance the game minute randomly
      const nextMinute = (match.liveMinute || 0) + Math.floor(Math.random() * 4) + 1;
      
      // End game if 90+ is reached
      if (nextMinute >= 90) {
        return {
          ...match,
          status: 'finished' as const,
          time: isEn ? 'FT' : 'انتهت',
          liveMinute: 90
        };
      }

      // 2. Chance of a goal (approx 35%)
      const isGoal = Math.random() < 0.35;
      if (isGoal) {
        const isHomeScoring = Math.random() < 0.55; // Slightly favor home teams for cheer
        let scorer = '';
        let nextScoreHome = match.scoreHome;
        let nextScoreAway = match.scoreAway;
        let scorerTeam: 'home' | 'away' = 'home';

        if (isHomeScoring) {
          nextScoreHome += 1;
          scorer = match.teamHome === 'المغرب' 
            ? moroccoScorers[Math.floor(Math.random() * moroccoScorers.length)]
            : saudiScorers[Math.floor(Math.random() * saudiScorers.length)];
          
          simulatedMatchEventText = isEn 
            ? `⚽ Sensational Goal scorer! [${scorer}] scored an unbelievable goal for ${t(match.teamHome)} at minute ${nextMinute}!` 
            : `⚽ هدف رائع وصراخ بالمدرجات! أحرز النجم [${scorer}] جولاً لصالح ${match.teamHome} في الدقيقة ${nextMinute}!`;
          eventTeamFlag = match.teamHomeFlag;
        } else {
          nextScoreAway += 1;
          scorer = match.teamHome === 'المغرب'
            ? argentinaScorers[Math.floor(Math.random() * argentinaScorers.length)]
            : germanyScorers[Math.floor(Math.random() * germanyScorers.length)];
          scorerTeam = 'away';
          
          simulatedMatchEventText = isEn
            ? `⚽ Sudden strike! The opponent [${scorer}] found the net against ${t(match.teamHome)} at minute ${nextMinute}!`
            : `⚽ هدف مباغت وخطير! تمكن المنافس [${scorer}] من التسديد في شباك ${match.teamHome} بالدقيقة ${nextMinute}!`;
          eventTeamFlag = match.teamAwayFlag;
        }

        // Add to timelines events
        const newEvents = [
          ...(match.events || []),
          {
            minute: nextMinute,
            player: scorer,
            type: 'goal' as const,
            team: scorerTeam
          }
        ];

        // 3. Increment Standings Points for Morocco or Saudi if match ends or continues!
        updateStandingsDatabase(match.teamHome, match.teamAway, isHomeScoring);

        return {
          ...match,
          scoreHome: nextScoreHome,
          scoreAway: nextScoreAway,
          liveMinute: nextMinute,
          time: `${nextMinute}'`,
          events: newEvents,
          possessionHome: Math.max(35, Math.min(65, (match.possessionHome || 50) + (Math.random() > 0.5 ? 2 : -2))),
          shotsHome: (match.shotsHome || 0) + (isHomeScoring ? 1 : Math.random() > 0.6 ? 1 : 0),
          shotsAway: (match.shotsAway || 0) + (!isHomeScoring ? 1 : Math.random() > 0.6 ? 1 : 0),
        };
      }

      // If no goal, just advance minutes and shots slightly
      return {
        ...match,
        liveMinute: nextMinute,
        time: `${nextMinute}'`,
        shotsHome: (match.shotsHome || 0) + (Math.random() > 0.85 ? 1 : 0),
        shotsAway: (match.shotsAway || 0) + (Math.random() > 0.85 ? 1 : 0),
      };
    });

    setMatches(updatedMatches);

    // Show simulated toast celebration banner if an event was generated
    if (simulatedMatchEventText) {
      setActiveToast({ message: simulatedMatchEventText, team: eventTeamFlag });
      setTimeout(() => setActiveToast(null), 5000);
    }
  };

  // Helper routine to update groups database for visual synchronization
  const updateStandingsDatabase = (homeName: string, awayName: string, homeScored: boolean) => {
    setGroupsData((prevGroups) => 
      prevGroups.map((group) => {
        // Find if target teams exist in this group
        const expandedTeams = group.teams.map((t) => {
          if (t.teamName === homeName) {
            return {
              ...t,
              gf: t.gf + (homeScored ? 1 : 0),
              points: t.points + (homeScored ? 3 : 0),
              won: t.won + (homeScored ? 1 : 0)
            };
          }
          if (t.teamName === awayName) {
            return {
              ...t,
              ga: t.ga + (homeScored ? 1 : 0),
              lost: t.lost + (homeScored ? 1 : 0),
              points: t.points - (homeScored ? 0 : 0) // No change or regular update
            };
          }
          return t;
        });

        // Re-sort group teams by points descending, then goal difference (gf - ga)
        const sorted = [...expandedTeams].sort((a, b) => b.points - a.points || (b.gf - b.ga) - (a.gf - a.ga));
        return {
          ...group,
          teams: sorted
        };
      })
    );
  };

  const handleSelectMatch = async (m: Match) => {
    // Scroll expanded details view smoothly into focus
    setTimeout(() => {
      document.getElementById('match-expanded-details-pane')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    // If it's a real API-Football match (usually numeric ID), fetch its real-time Statistics and Timelines
    const isRealMatchId = /^\d+$/.test(m.id);
    if (isRealMatchId && isUsingLiveApi) {
      try {
        const [statsRes, eventsList] = await Promise.all([
          fetchFromFootballApi('fixtures/statistics', { fixture: m.id }).catch(() => null),
          getFixtureEvents(m.id).catch(() => null)
        ]);

        let possessionHome = 50;
        let possessionAway = 50;
        let shotsHome = 0;
        let shotsAway = 0;

        // Parse possession and shots statistics safely
        if (statsRes && statsRes.response && statsRes.response.length > 0) {
          const homeStats = statsRes.response[0]?.statistics || [];
          const awayStats = statsRes.response[1]?.statistics || [];

          const homePoss = homeStats.find((s: any) => s.type === 'Ball Possession')?.value;
          const awayPoss = awayStats.find((s: any) => s.type === 'Ball Possession')?.value;
          if (homePoss) possessionHome = parseInt(homePoss) || 50;
          if (awayPoss) possessionAway = parseInt(awayPoss) || 50;

          const homeShots = homeStats.find((s: any) => s.type === 'Total Shots')?.value;
          const awayShots = awayStats.find((s: any) => s.type === 'Total Shots')?.value;
          if (homeShots) shotsHome = parseInt(homeShots) || 0;
          if (awayShots) shotsAway = parseInt(awayShots) || 0;
        }

        // Parse timeline events (goals, cards, substitutions) safely
        let parsedEvents = m.events || [];
        if (eventsList && Array.isArray(eventsList)) {
          parsedEvents = eventsList.map((ev: any) => {
            let evType: 'goal' | 'yellow' | 'red' | 'sub' = 'goal';
            if (ev.type === 'Goal') evType = 'goal';
            else if (ev.type === 'Card' && ev.detail === 'Yellow Card') evType = 'yellow';
            else if (ev.type === 'Card' && ev.detail === 'Red Card') evType = 'red';
            else if (ev.type === 'subst' || ev.type === 'Subst') evType = 'sub';

            return {
              minute: ev.time?.elapsed || 0,
              player: ev.player?.name || ev.assist?.name || 'لاعب',
              type: evType,
              team: ev.team?.name === m.teamHome ? 'home' as const : 'away' as const
            };
          }).slice(0, 20); // Keep top 20 events for visual tidiness
        }

        // Merge these premium live statistics and timelines into state
        setMatches(prev => prev.map(match => {
          if (match.id === m.id) {
            return {
              ...match,
              possessionHome,
              possessionAway,
              shotsHome,
              shotsAway,
              events: parsedEvents
            };
          }
          return match;
        }));

      } catch (err) {
        console.log("Error loading individual match statistics:", err);
      }
    }
  };

  const loadLiveFootballData = async (seasonToLoad: string) => {
    try {
      setApiLoading(true);
      setApiError(null);
      
      const mappedStandings = await getStandings('39', '2025', isEn);
      const mappedFixtures = await getLeagueFixtures('39', '2025', isEn);
      
      if (mappedStandings.length > 0) {
        setGroupsData(mappedStandings);
      } else {
        if (seasonToLoad === '2026') {
          setGroupsData(GROUPS_2026);
          setApiError(isEn 
            ? 'The 2026 World Cup Group data has not been drawn in API-Football yet. Showing simulated pre-tournament groups.' 
            : 'لم يتم سحب قرعة مجموعات ٢٠٢٦ بعد في API-Football. تم عرض المجموعات التوقعية للبطولة.');
        }
      }
      
      if (mappedFixtures.length > 0) {
        setMatches(mappedFixtures);
      } else {
        if (seasonToLoad === '2026') {
          setMatches(get2026Matches(isEn));
        }
      }

      // Fetch Top Scorers Dynamically
      try {
        const mappedScorers = await getTopScorers('39', '2025', isEn);
        if (mappedScorers.length > 0) {
          setScorers(mappedScorers);
        } else {
          if (seasonToLoad === '2026') {
            setScorers(TOP_SCORERS_2026);
          }
        }
      } catch (e) {
        console.log("Failed to fetch top scorers:", e);
        if (seasonToLoad === '2026') {
          setScorers(TOP_SCORERS_2026);
        }
      }

      setIsUsingLiveApi(true);
    } catch (err: any) {
      console.error("[API-Football Loading Error in App.tsx]", err);
      setApiError(err.message || 'Error connecting to API-Football.');
      
      // Fallback robustly so the app continues to render fully populated tables and tickers
      if (seasonToLoad === '2026') {
        setGroupsData(GROUPS_2026);
        setMatches(get2026Matches(isEn));
        setScorers(TOP_SCORERS_2026);
      } else {
        setGroupsData(GROUPS_2022);
        setMatches(get2022Matches(isEn));
        setScorers(TOP_SCORERS_2022);
      }
      setIsUsingLiveApi(false);
    } finally {
      setApiLoading(false);
    }
  };

  // Re-load data if season or language settings change
  useEffect(() => {
    const checkConfig = async () => {
      try {
        const config = await fetchApiConfig();
        setHasApiKey(config.hasFootballApiKey);
      } catch (e) {
        setHasApiKey(false);
      }
    };
    checkConfig();

    // Fetch real-time RSS sport news
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/news');
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.articles) && data.articles.length > 0) {
            setArticles(data.articles);
          }
        }
      } catch (err) {
        console.log("Error loading real-time news articles:", err);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    loadLiveFootballData(apiSeason);
  }, [apiSeason, language]);

  // Live match auto-refresh every 30 seconds
  useEffect(() => {
    let intervalId: any = null;
    if (isUsingLiveApi) {
      console.log("[Live Match Auto-Refresh] Starting 30-second interval timer...");
      intervalId = setInterval(async () => {
        try {
          console.log("[Live Match Auto-Refresh] Querying live matches...");
          const liveList = await getLiveMatches(isEn);
          if (liveList && liveList.length > 0) {
            console.log(`[Live Match Auto-Refresh] Fetched ${liveList.length} live matches. Merging update...`);
            setMatches(prevMatches => {
              const liveMap = new Map(liveList.map(m => [m.id, m]));
              return prevMatches.map(prev => {
                const liveUpdate = liveMap.get(prev.id);
                if (liveUpdate) {
                  return {
                    ...prev,
                    ...liveUpdate,
                    // Keep existing items if necessary
                  };
                }
                return prev;
              });
            });
          }
        } catch (e) {
          console.error("[Live Match Auto-Refresh Error]", e);
        }
      }, 30000); // 30 seconds
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        console.log("[Live Match Auto-Refresh] Cleared background update interval.");
      }
    };
  }, [isUsingLiveApi, isEn]);

  return (
    <div className="min-h-screen bg-[#f7f9fa] flex flex-col justify-between" id="msn-applet-root">
      
      {/* Dynamic Simulation celebration banner overlay toast */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: -80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            className={`fixed top-24 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-linear-to-r from-red-600 via-orange-600 to-amber-500 text-white p-4 rounded-xl shadow-2xl z-[100] border-2 border-white flex gap-3.5 items-center ${isEn ? 'text-left' : 'text-right'}`}
          >
            <span className="text-4xl shrink-0" role="img" aria-label="Celebration emoji">
              {activeToast.team || '🥅'}
            </span>
            <div>
              <h4 className="text-sm font-black tracking-wide flex items-center gap-1">
                <Flame className="w-4 h-4 text-yellow-300 fill-current animate-bounce" />
                <span>{t('toast.title')}</span>
              </h4>
              <p className="text-xs mt-1 text-yellow-50 leading-relaxed font-bold">
                {activeToast.message}
              </p>
            </div>
            <button 
              onClick={() => setActiveToast(null)} 
              className={`text-white hover:text-yellow-200 font-extrabold text-sm ${isEn ? 'ml-auto' : 'mr-auto'} bg-black/15 p-1 rounded-full cursor-pointer shrink-0`}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
 
      {/* 1. Header component */}
      <Header 
        activeMainTab={activeMainTab} 
        setActiveMainTab={setActiveMainTab} 
        activeSubTab={activeSubTab} 
        setActiveSubTab={setActiveSubTab} 
        isAdmin={isAdmin}
        adminEmail={adminEmail}
        onLogout={handleLogout}
        onOpenLogin={() => setLoginModalOpen(true)}
        apiSeason={apiSeason}
        setApiSeason={setApiSeason}
      />
  
      {/* 2. Main Page layout shell */}
      <main className="max-w-7xl mx-auto w-full px-4 flex-grow mb-12">
        <AnimatePresence mode="wait">
          
          {/* ==================== HOME TAB ==================== */}
          {activeMainTab === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 mt-5 text-right"
            >
              {/* Hot Video highlights of MSN Home */}
              <div className="hidden">
                <div className={`flex items-center gap-2 mb-4 border-b border-gray-200 pb-2 ${isEn ? 'flex-row-reverse' : ''}`}>
                  <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
                  <h3 className="text-sm md:text-base font-black text-gray-900">
                    {isEn ? "Latest Video Highlights" : "أحدث ملخصات الفيديو واللقاءات"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {videos.slice(0, 4).map((vid) => (
                    <div 
                      key={vid.id}
                      onClick={() => setActiveVideo(vid)}
                      className="bg-white border text-right border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                    >
                      <div className="relative aspect-video w-full bg-slate-900">
                        <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                        <span className="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded-xs font-bold">{vid.duration}</span>
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="text-xs font-black text-gray-850 line-clamp-2 h-8 leading-tight group-hover:text-blue-650 transition-colors">{vid.title}</h4>
                        <div className={`flex items-center justify-between text-[10px] text-gray-400 mt-2 font-bold ${isEn ? 'flex-row-reverse' : ''}`}>
                          <span>{vid.publisherName}</span>
                          <span>{vid.viewsCount >= 1000 ? `${(vid.viewsCount/1000).toFixed(0)}k ` : vid.viewsCount} {isEn ? 'views' : 'مشاهدة'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete lists catalog below */}
              <NewsGrid 
                articles={articles} 
                isAdmin={isAdmin}
                onEditArticle={handleEditArticleTrigger}
                onDeleteArticle={handleDeleteArticle}
              />
            </motion.div>
          )}

          {/* ==================== NEWS TAB ==================== */}
          {activeMainTab === 'news' && (
            <motion.div
              key="news-only-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="mt-4"
            >
              <NewsGrid 
                articles={articles.filter(a => a.category !== 'تغطية المشاهير')} 
                isAdmin={isAdmin}
                onEditArticle={handleEditArticleTrigger}
                onDeleteArticle={handleDeleteArticle}
              />
            </motion.div>
          )}

          {/* ==================== SPORTS TAB (The FIFA World Cup hub) ==================== */}
          {activeMainTab === 'sports' && (
            <motion.div
              key="sports-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >

              {/* Live API Status / Connection Guide */}
              {isAdmin && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden text-right">
                  <div className={`p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-150 ${isEn ? 'md:flex-row-reverse' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-3.5 h-3.5 rounded-full ${hasApiKey && isUsingLiveApi ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`}></div>
                      <div className={isEn ? "text-left" : "text-right"}>
                        <h3 className="text-sm md:text-base font-black text-gray-900">
                          {hasApiKey && isUsingLiveApi 
                            ? (isEn ? "Live RSS & API-Football Integration Active" : "تكامل البيانات والترتيب الحقيقي المباشر نشط ومفعّل 🟢")
                            : (isEn ? "Running in Tournament Simulation Mode" : "التطبيق يعمل حالياً بوضع المحاكاة الافتراضية 🔴")}
                        </h3>
                        <p className="text-xs text-gray-400 font-bold mt-0.5">
                          {hasApiKey && isUsingLiveApi
                            ? (isEn ? "Fetching real-time matches, lineups, statistics directly from API-Football." : "مباريات حية، جداول، إحصائيات ولقاءات حية يتم تحديثها تلقائياً بالكامل من الخادم.")
                            : (isEn ? "Configure your credentials to fetch live tournament standings and schedules dynamically." : "يمكنك جلب جداول المجموعات وترتيب الهدافين ومواجهات حية حقيقية بالكامل بخطوات بسيطة!")}
                        </p>
                      </div>
                    </div>
                    <div className={`flex gap-2 w-full md:w-auto ${isEn ? 'justify-start' : 'justify-end'}`}>
                      <button
                        onClick={handleRecheckApiKey}
                        disabled={apiLoading}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-black transition-colors shadow-sm cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                      >
                        {apiLoading ? '...' : '🔄'} {isEn ? "Check Connection" : "تحديث الفحص والاتصال"}
                      </button>
                      <button
                        onClick={() => setShowApiGuide(!showApiGuide)}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        {showApiGuide ? (isEn ? "Hide Guide" : "إخفاء الدليل") : (isEn ? "Show Setup Guide" : "عرض دليل الإعداد")}
                      </button>
                    </div>
                  </div>

                  {showApiGuide && !isUsingLiveApi && (
                    <div className="bg-slate-50/70 p-5 border-t border-gray-100 animate-fadeIn space-y-4 text-xs md:text-sm">
                      <div className={`flex items-start gap-3 text-right bg-blue-50/50 p-4 rounded-lg border border-blue-100 ${isEn ? 'flex-row-reverse text-left' : ''}`}>
                        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-extrabold text-blue-900 text-sm">{isEn ? "How to Fetch Real Data & Tables?" : "كيف نقوم بجلب البيانات، الجداول، ومواعيد المباريات الحقيقية؟"}</h4>
                          <p className="text-blue-700 font-bold text-xs mt-1 leading-relaxed">
                            {isEn 
                              ? "This application is fully responsive and integrates with API-Football for live matches and tournaments. To obtain real-time stats, you need an API key configured in Google AI Studio:" 
                              : "يحتوي هذا التطبيق على خادم وسيط متطور للاتصال بالمنصة العالمية API-Football. لجلب وعرض جداول المجموعات وترتيب الهدافين واللقاءات حية لحظة بلحظة، يرجى اتباع الخطوات البسيطة التالية:"}
                          </p>
                        </div>
                      </div>

                      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${isEn ? 'dir-ltr' : ''}`}>
                        <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-xs flex flex-col justify-between space-y-3">
                          <div>
                            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black mb-2">1</span>
                            <h4 className="font-black text-gray-800 text-xs">{isEn ? "Get API Key" : "امتلاك مفتاح ترخيص"}</h4>
                            <p className="text-gray-400 text-[11px] font-bold mt-1 leading-relaxed">
                              {isEn 
                                ? "Visit API-Football (dashboard.api-football.com) and create a free account to copy your free API Token." 
                                : "سجل حسابًا مجانياً تمامًا في بوابة المطورين API-Football للحصول على 100 طلب مجانياً يومياً وانسخ رمز الترخيص."}
                            </p>
                          </div>
                          <a 
                            href="https://dashboard.api-football.com/" 
                            target="_blank" 
                            referrerPolicy="no-referrer"
                            className="text-blue-600 hover:underline text-xs font-bold block pt-1"
                          >
                            {isEn ? "Go to API-Football →" : "الانتقال لموقع المنصة الرسمية ←"}
                          </a>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-xs space-y-2">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black mb-2">2</span>
                          <h4 className="font-black text-gray-800 text-xs">{isEn ? "Set Variable Secret" : "تسجيل المتغير السري"}</h4>
                          <p className="text-gray-400 text-[11px] font-bold mt-1 leading-relaxed">
                            {isEn 
                              ? "In the bottom sidebar of Google AI Studio, click on Settings / Secrets and add a new environment variable:" 
                              : "في القائمة الجانبية أو السفلية لمنصة Google AI Studio، افتح خيار الإعدادات (⚙️ Secrets / Variables) وأضف مفتاحًا جديدًا:"}
                          </p>
                          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex items-center justify-between font-mono text-[10px] text-slate-800 font-bold">
                            <span>FOOTBALL_API_KEY</span>
                            <button 
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText("FOOTBALL_API_KEY");
                              }}
                              className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-150 cursor-pointer text-[9px]"
                            >
                              {isEn ? "Copy Name" : "نسخ الاسم"}
                            </button>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-xs flex flex-col justify-between space-y-3">
                          <div>
                            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black mb-2">3</span>
                            <h4 className="font-black text-gray-800 text-xs">{isEn ? "Save and Reload" : "حفظ ثم تحديث البيانات"}</h4>
                            <p className="text-gray-400 text-[11px] font-bold mt-1 leading-relaxed">
                              {isEn 
                                ? "Paste your key, save changes, and click the 'Check Connection 🔄' button above to enjoy fully synchronized real-time matches!" 
                                : "الصق المفتاح في خانة القيمة (Value)، واحفظ التغييرات، ثم اضغط على زر 'تحديث الفحص والاتصال 🔄' لتستمتع بمتابعة المونديال فورياً!"}
                            </p>
                          </div>
                          <button 
                            onClick={handleRecheckApiKey}
                            className="w-full text-center bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-black px-2.5 py-1.5 rounded-lg text-xs"
                          >
                            {isEn ? "Check Connection Now" : "تحديث وفحص الاتصال الآن"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}



              {/* SPORTS SUB-TAB IMPLEMENTATIONS */}
              {activeSubTab === 'news' && (
                <div className="space-y-6 mt-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-right">
                    <div className="lg:col-span-2">
                      <StandingsWidget groups={groupsData} />
                    </div>
                    <div className="lg:col-span-1 bg-gradient-to-b from-blue-900 to-indigo-950 rounded-xl p-5 text-white border border-blue-950 flex flex-col justify-between shadow-md">
                      <div>
                        <span className="bg-[#dc2626] text-white text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-xs">
                          {t('sidebar.alert')}
                        </span>
                        <h3 className="text-base font-black text-white mt-1.5 leading-snug">
                          {t('sidebar.title')}
                        </h3>
                        <p className="text-xs text-blue-200 leading-relaxed mt-2 font-medium">
                          {t('sidebar.desc')}
                        </p>
                        <div className="bg-white/10 p-3.5 rounded-lg border border-white/10 mt-5 space-y-2 text-xs">
                          <div className="flex gap-2">
                            <span className="text-emerald-400">✓</span>
                            <span>{t('sidebar.point1')}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-emerald-400">✓</span>
                            <span>{t('sidebar.point2')}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-blue-300 ${isEn ? 'flex-row-reverse' : ''}`}>
                        <span className="font-bold">{t('sidebar.brandfooter')}</span>
                        <Trophy className="w-5 h-5 text-yellow-400 fill-yellow-400 font-black animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <NewsGrid 
                    articles={articles.filter(a => a.category !== 'تغطية المشاهير')} 
                    isAdmin={isAdmin}
                    onEditArticle={handleEditArticleTrigger}
                    onDeleteArticle={handleDeleteArticle}
                  />
                </div>
              )}

              {activeSubTab === 'fixtures' && (
                <div className="space-y-6 mt-4">
                  <MatchTicker 
                    matches={matches} 
                    onTriggerSimulation={triggerSimulation} 
                    onSelectMatch={handleSelectMatch}
                    isAdmin={isAdmin}
                    onEditMatch={handleEditMatchTrigger}
                    onDeleteMatch={handleDeleteMatch}
                  />
                </div>
              )}

              {activeSubTab === 'standings' && (
                <div className="mt-4">
                  <StandingsWidget groups={groupsData} />
                </div>
              )}

              {activeSubTab === 'scorers' && (
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs mt-4 text-right">
                  <div className={`flex items-center gap-2.5 border-b border-gray-150 pb-3 mb-5 ${isEn ? 'flex-row-reverse' : ''}`}>
                    <Footprints className="w-5 h-5 text-emerald-500 font-black" />
                    <div>
                      <h3 className="text-sm md:text-base font-black text-gray-900">{t('scorers.title')}</h3>
                      <p className="text-xs text-gray-400 font-bold">{t('scorers.subtitle')}</p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className={`w-full ${isEn ? 'text-left' : 'text-right'} text-xs md:text-sm border-collapse`}>
                      <thead>
                        <tr className="border-b border-gray-200 text-gray-400 font-bold">
                          <th className="py-3 px-3">{t('scorers.th.rank')}</th>
                          <th className="py-3 px-3">{t('scorers.th.player')}</th>
                          <th className="py-3 px-3 text-center">{t('scorers.th.played')}</th>
                          <th className="py-3 px-3 text-center">{t('scorers.th.goals')}</th>
                          <th className="py-3 px-3 text-center">{t('scorers.th.assists')}</th>
                          <th className="py-3 px-3 text-center">{t('scorers.th.accuracy')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scorers.map((player) => (
                          <tr key={player.rank} className="border-b border-gray-100 transition-colors hover:bg-slate-50">
                            <td className="py-4 px-3 font-mono font-black text-gray-500 text-base">#{player.rank}</td>
                            <td className="py-4 px-3">
                              <div className={`flex items-center gap-2 ${isEn ? 'flex-row' : 'flex-row-reverse'}`}>
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-center text-xl shrink-0">🏃</div>
                                <div className={isEn ? '' : 'text-right'}>
                                  <p className="font-extrabold text-[#111827]">{player.name}</p>
                                  <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1 justify-start">
                                    <span>{player.teamFlag}</span>
                                    <span>{isEn ? `${t(player.team)} National` : `منتخب ${t(player.team)}`}</span>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-3 text-center font-mono font-medium text-gray-600">{player.matchesPlayed}</td>
                            <td className="py-4 px-3 text-center font-mono text-sm md:text-base font-black text-blue-600 bg-blue-50/30 rounded-lg">
                              {player.goals} {t('scorers.goalsCount')}
                            </td>
                            <td className="py-4 px-3 text-center font-mono font-medium text-gray-500">{player.assists} {t('scorers.assistsCount')}</td>
                            <td className="py-4 px-3">
                              <div className="flex items-center gap-2 justify-center">
                                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden hidden sm:block">
                                  <div className="bg-emerald-500 h-full" style={{ width: `${player.shotsOnTargetPercent}%` }}></div>
                                </div>
                                <span className="font-mono font-bold text-[11px] text-emerald-600">{player.shotsOnTargetPercent}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSubTab === 'bracket' && (
                <div className="mt-4">
                  <BracketView />
                </div>
              )}

              {activeSubTab === 'fanzone' && (
                <div className="mt-4">
                  <FanZone />
                </div>
              )}
            </motion.div>
          )}

          {/* ==================== ENTERTAINMENT TAB ==================== */}
          {activeMainTab === 'entertainment' && (
            <motion.div
              key="entertainment-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 mt-6 text-right"
            >
              {/* Entertainment Banner Cover */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-800 via-pink-700 to-rose-600 p-8 md:p-12 text-white shadow-md">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-2xl z-10">
                  <span className="bg-yellow-400 text-slate-900 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full inline-block mb-3">
                    {isEn ? "Celebrity & Behind-The-scenes" : "تغطية المشاهير وكواليس المونديال"}
                  </span>
                  <h2 className="text-xl md:text-3xl font-black leading-tight mb-2">
                    {isEn ? "The Fun Side of FIFA World Cup 2026" : "الجانب الترفيهي والفني لبطولة كأس العالم ٢٠٢٦"}
                  </h2>
                  <p className="text-xs md:text-sm text-pink-50 leading-relaxed font-bold">
                    {isEn 
                      ? "Get access to exclusive gossip, soccer stars, fun tournament trivia, music theme highlights and fan fashion across USA!" 
                      : "انفرد بمتابعة أخبار النجوم، أزياء الجماهير بالمدرجات، اللقاءات الفكاهية، وأبرز التريندات على منصات التواصل الاجتماعي!"
                    }
                  </p>
                </div>
              </div>

              {/* Feed Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {articles.filter(a => a.category === 'تغطية المشاهير').map((item) => (
                  <div key={item.id} className="bg-white border text-right border-gray-150 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row h-full">
                    <div className="relative w-full md:w-48 h-48 shrink-0 bg-slate-100">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 right-2 bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 rounded-sm">
                        {isEn ? "Celebrity" : "ترفيه النجوم"}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <div className={`flex items-center gap-2 text-[10px] text-gray-400 font-bold mb-1.5 ${isEn ? 'flex-row' : 'flex-row-reverse'}`}>
                          <span>{item.publisherName}</span>
                          <span>•</span>
                          <span>{t(item.elapsed)}</span>
                        </div>
                        <h3 className="text-sm font-black text-slate-900 leading-snug line-clamp-2 hover:text-purple-600 transition-colors mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                          {item.contentSummary}
                        </p>
                      </div>

                      {/* Card actions */}
                      <div className={`flex items-center justify-between border-t border-gray-50 pt-3 mt-4 text-xs font-black ${isEn ? 'flex-row-reverse' : ''}`}>
                        <span className="text-[10px] text-gray-400 font-bold">
                          {item.viewsCount} {isEn ? 'reads' : 'قراءة'}
                        </span>
                        
                        <div className="flex items-center gap-3">
                          {isAdmin && (
                            <button 
                              onClick={() => handleEditArticleTrigger(item)}
                              className="text-amber-600 hover:text-amber-700 text-xs font-black"
                            >
                              {isEn ? "Edit" : "تعديل"}
                            </button>
                          )}
                          <button 
                            onClick={() => {
                              setArticles(prev => prev.map(a => {
                                if (a.id === item.id) {
                                  return { ...a, likesCount: a.likesCount + 1 };
                                }
                                return a;
                              }));
                            }}
                            className="flex items-center gap-1 text-rose-500 hover:text-rose-600 cursor-pointer"
                          >
                            <Heart className="w-3.5 h-3.5 fill-current" />
                            <span>{item.likesCount}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Instant Quiz Trivia block of MSN Entertainment */}
              <div className="bg-purple-50/50 border border-purple-100 p-5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-5 animate-pulse-slow">
                <div className="text-right">
                  <h4 className="text-sm font-black text-purple-950 flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span>{isEn ? "Weekly Entertainment Quiz Trivia!" : "سؤال الترفيه الأسبوعي الكروي!"}</span>
                  </h4>
                  <p className="text-xs text-purple-800 leading-relaxed mt-1">
                    {isEn ? "Test your knowledge: Who is the all-time top world cup soccer goals champion?" : "اختبر معلوماتك: من هو الهداف التاريخي لبطولات كأس العالم لكرة القدم حتى الآن؟"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setCustomAlert({ message: isEn ? "Wrong answer! It's Miroslav Klose with 16 goals." : "للأسف خطأ! الهداف التاريخي هو كلوزه بـ 16 هدفاً." })} className="px-3.5 py-1.5 bg-white border border-purple-200 text-purple-900 rounded-md text-xs font-bold hover:bg-purple-100 transition-colors cursor-pointer text-center">ليونيل ميسي</button>
                  <button onClick={() => setCustomAlert({ message: isEn ? "Wrong answer! Pelé scored 12 goals." : "للأسف خطأ! بيليه سجل 12 هدفاً في المونديال." })} className="px-3.5 py-1.5 bg-white border border-purple-200 text-purple-900 rounded-md text-xs font-bold hover:bg-purple-100 transition-colors cursor-pointer text-center">بيليه</button>
                  <button onClick={() => setCustomAlert({ message: isEn ? "Correct! Absolutely amazing kooora knowledge. Miroslav Klose scored 16 goals." : "إجابة صحيحة وممتازة! النجم الألماني ميروسلاف كلوزه برصيد 16 هدفاً." })} className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-750 text-white rounded-md text-xs font-bold transition-colors cursor-pointer text-center">ميروسلاف كلوزه</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== VIDEO TAB ==================== */}
          {activeMainTab === 'video' && (
            <motion.div
              key="video-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 mt-6 text-right"
            >
              {/* Theater Introduction banner */}
              <div className="bg-slate-900 rounded-xl p-6 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
                <div>
                  <h3 className="text-sm md:text-base font-black text-blue-400 flex items-center gap-1.5 justify-end">
                    <Film className="w-5 h-5" />
                    <span>{isEn ? "Nexus Tournament Video Center" : "بوابة ميديا وفيديو المنصة"}</span>
                  </h3>
                  <p className="text-[11px] md:text-xs text-slate-300 mt-2 font-medium">
                    {isEn 
                      ? "Immerse yourself of live match highlights, sensational camera reels, fan celebration videos, and tactical interviews in full high fidelity streaming." 
                      : "شاهد ملخصات اللقاءات الرسمية، حفل الافتتاح الأسطوري، كواليس تدريبات منتخبات المجموعة، واللقطات الفكاهية للمشجعين بمدرجات أمريكا وكندا."
                    }
                  </p>
                </div>
                <span className="text-4xl text-slate-700 hidden md:block">🎬</span>
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((vid) => (
                  <div 
                    key={vid.id}
                    onClick={() => setActiveVideo(vid)}
                    className="bg-white border text-right border-gray-150 rounded-xl overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-0.5 duration-300 cursor-pointer group"
                  >
                    <div className="relative aspect-video w-full bg-slate-900">
                      <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300" />
                      <span className="absolute bottom-2.5 left-2.5 bg-black/80 backdrop-blur-xs text-white text-[10px] font-mono font-black px-2 py-0.5 rounded-sm">
                        {vid.duration}
                      </span>
                      <div className="absolute inset-0 bg-black/15 flex items-center justify-center group-hover:bg-black/35 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-transform">
                          <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className={`flex items-center gap-2 mb-2 text-[10px] text-zinc-400 font-bold ${isEn ? 'flex-row' : 'flex-row-reverse'}`}>
                        <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded-sm uppercase tracking-wider text-[8px] font-black">{isEn ? "1080P HD" : "بث عالي الدقة"}</span>
                        <span>•</span>
                        <span>{vid.publisherName}</span>
                      </div>
                      <h4 className="text-xs md:text-sm font-black text-slate-900 leading-snug line-clamp-2 h-10 group-hover:text-blue-650 transition-colors">
                        {vid.title}
                      </h4>
                      <div className={`flex items-center justify-between text-[11px] text-gray-400 mt-4 border-t border-gray-50 pt-2 font-bold ${isEn ? 'flex-row-reverse' : ''}`}>
                        <span>{vid.viewsCount >= 1000 ? `${(vid.viewsCount/1000).toFixed(0)}k ` : vid.viewsCount} {isEn ? 'views' : 'مشاهدة'}</span>
                        <span>{t(vid.elapsed)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ==================== MANAGER PANEL TAB (SECURED) ==================== */}
          {activeMainTab === 'manager' && isAdmin && (
            <motion.div
              key="manager-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 mt-6 text-right"
            >
              {/* Dashboard Banner Header */}
              <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-right">
                  <h2 className="text-lg md:text-xl font-black text-amber-400 flex items-center gap-2 justify-end">
                    <span>لوحة تحكم المشرفين والمدير المعتمد (حسني)</span>
                    <Lock className="w-5 h-5 text-amber-400 fill-current" />
                  </h2>
                  <p className="text-xs text-slate-300 mt-1.5 font-bold leading-normal">
                    مرحباً حسني! يرجى الاستعانة باللوحة لإضافة وتعديل وحذف أي مقال ترفيهي أو كروي، نتائج ومواعيد اللقاءات المباشرة، وقاعدة الميديا وملخصات الفيديو.
                  </p>
                </div>
                <button 
                  onClick={handleResetToDefaults}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 text-red-400 hover:bg-slate-700 text-xs font-black rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  ⚠️ إعادة تعيين قاعدة المونديال للأصل
                </button>
              </div>

              {/* Secondary Navigation for Manager */}
              <div className="flex border-b border-gray-200">
                <button 
                  onClick={() => { setCurrentManagerSubTab('news'); clearAllFormFields(); }}
                  className={`px-5 py-3 font-black text-xs md:text-sm border-b-2 cursor-pointer transition-colors ${currentManagerSubTab === 'news' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  📝 إدارة الأخبار والترفيه
                </button>
                <button 
                  onClick={() => { setCurrentManagerSubTab('matches'); clearAllFormFields(); }}
                  className={`px-5 py-3 font-black text-xs md:text-sm border-b-2 cursor-pointer transition-colors ${currentManagerSubTab === 'matches' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  ⚽ إدارة مباريات ونتائج الرياضة
                </button>
                <button 
                  onClick={() => { setCurrentManagerSubTab('video'); clearAllFormFields(); }}
                  className={`px-5 py-3 font-black text-xs md:text-sm border-b-2 cursor-pointer transition-colors ${currentManagerSubTab === 'video' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  🎬 إدارة مقاطع الفيديو والملخصات
                </button>
              </div>

              {/* Form & List Grid container */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 1. Left Side: Form Creator Element */}
                <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl p-5 shadow-xs h-fit antialiased">
                  <h3 className="text-sm font-black text-[#111827] border-b border-gray-100 pb-2 mb-4">
                    {editModeId ? '📝 تعديل وحفظ العنصر الحالي' : '➕ إضافة عنصر جديد إلى المنصة'}
                  </h3>
                  
                  {/* NEWS / ENTERTAINMENT ARTICLE FORM */}
                  {currentManagerSubTab === 'news' && (
                    <form onSubmit={handleSaveArticle} className="space-y-4">
                      <div>
                        <label className="text-xs font-black text-gray-700 block mb-1">عنوان المقال (أو الخبر)</label>
                        <input 
                          type="text" 
                          value={artTitle} 
                          onChange={(e) => setArtTitle(e.target.value)}
                          placeholder="مثال: أسود الأطلس يكتسحون الجميع..."
                          className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-600 focus:bg-white focus:outline-hidden font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-black text-gray-700 block mb-1">رابط صورة المقال</label>
                        <input 
                          type="text" 
                          value={artImage} 
                          onChange={(e) => setArtImage(e.target.value)}
                          placeholder="أدخل رابط عنوان الصورة (https://...)"
                          className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-600 focus:bg-white focus:outline-hidden font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs font-black text-gray-700 block mb-1">القسم / التصنيف</label>
                          <select 
                            value={artCategory}
                            onChange={(e) => setArtCategory(e.target.value)}
                            className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-hidden font-bold"
                          >
                            <option value="أخبار كأس العالم">الأخبار (News)</option>
                            <option value="تحليلات رياضية">الرياضة (Sports)</option>
                            <option value="تغطية المشاهير">الترفيه (Entertainment)</option>
                            <option value="أخبار السامبا">أخبار السامبا (Samba News)</option>
                            <option value="أرقام وإحصائيات">إحصائيات وأرقام (Stats)</option>
                            <option value="تقارير خاصة">تقارير خاصة (Special Reports)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-black text-gray-700 block mb-1">اسم الناشر</label>
                          <input 
                            type="text" 
                            value={artPublisher} 
                            onChange={(e) => setArtPublisher(e.target.value)}
                            placeholder="CNN، الجزيرة..."
                            className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-hidden font-bold"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-black text-gray-700 block mb-1">ملخص قصير لمحتوى الخبر</label>
                        <textarea 
                          rows={3}
                          value={artSummary} 
                          onChange={(e) => setArtSummary(e.target.value)}
                          placeholder="اكتب هنا التفاصيل الأساسية..."
                          className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-hidden font-bold leading-relaxed"
                        />
                      </div>
                      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-black py-2 px-4 rounded-lg shadow-xs cursor-pointer">
                        {editModeId ? 'حفظ التحديثات الحالي' : 'بث المقال مباشرة'}
                      </button>
                    </form>
                  )}

                  {/* SPORTS MATCHES / FIXTURES FORM */}
                  {currentManagerSubTab === 'matches' && (
                    <form onSubmit={handleSaveMatch} className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs font-black text-gray-700 block mb-1">الفريق الأول (Home)</label>
                          <input 
                            type="text" 
                            value={matchHome} 
                            onChange={(e) => setMatchHome(e.target.value)}
                            placeholder="المغرب، مصر..."
                            className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-hidden font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-black text-gray-700 block mb-1">علم الفريق الأول</label>
                          <input 
                            type="text" 
                            value={matchHomeFlag} 
                            onChange={(e) => setMatchHomeFlag(e.target.value)}
                            placeholder="🇲🇦، 🇪🇬..."
                            className="w-full text-xs text-center text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-hidden text-lg"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs font-black text-gray-700 block mb-1">الفريق المنافس (Away)</label>
                          <input 
                            type="text" 
                            value={matchAway} 
                            onChange={(e) => setMatchAway(e.target.value)}
                            placeholder="ألمانيا، البرازيل..."
                            className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-hidden font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-black text-gray-700 block mb-1">علم المنافس</label>
                          <input 
                            type="text" 
                            value={matchAwayFlag} 
                            onChange={(e) => setMatchAwayFlag(e.target.value)}
                            className="w-full text-xs text-center text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-hidden text-lg"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                        <div>
                          <label className="text-[10px] font-black text-gray-600 block mb-1">أهداف Home</label>
                          <input 
                            type="number" 
                            value={matchScoreHome} 
                            onChange={(e) => setMatchScoreHome(parseInt(e.target.value) || 0)}
                            className="w-full text-xs text-center font-bold text-slate-800 border rounded p-1"
                          />
                        </div>
                        <div className="text-center font-black pt-5 text-gray-400">vs</div>
                        <div>
                          <label className="text-[10px] font-black text-gray-600 block mb-1">أهداف Away</label>
                          <input 
                            type="number" 
                            value={matchScoreAway} 
                            onChange={(e) => setMatchScoreAway(parseInt(e.target.value) || 0)}
                            className="w-full text-xs text-center font-bold text-slate-800 border rounded p-1"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs font-black text-gray-700 block mb-1">الحالة</label>
                          <select 
                            value={matchStatus}
                            onChange={(e) => setMatchStatus(e.target.value as any)}
                            className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-hidden font-bold"
                          >
                            <option value="upcoming">قادمة (Upcoming)</option>
                            <option value="live">مباشر حية (Live)</option>
                            <option value="finished">انتهت (Finished)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-black text-gray-700 block mb-1">التوقيت / الدقيقة</label>
                          <input 
                            type="text" 
                            value={matchTime} 
                            onChange={(e) => setMatchTime(e.target.value)}
                            placeholder="78'، اليوم 21:00"
                            className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-hidden font-bold"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs font-black text-gray-700 block mb-1">المجموعة</label>
                          <input 
                            type="text" 
                            value={matchGroup} 
                            onChange={(e) => setMatchGroup(e.target.value)}
                            className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-hidden font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-black text-gray-700 block mb-1">الملعب (المكان)</label>
                          <input 
                            type="text" 
                            value={matchStadium} 
                            onChange={(e) => setMatchStadium(e.target.value)}
                            className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-hidden font-bold"
                          />
                        </div>
                      </div>
                      <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2 px-4 rounded-lg shadow-xs cursor-pointer">
                        {editModeId ? 'حفظ تعديلات المباراة' : 'بث وتعميم المباراة'}
                      </button>
                    </form>
                  )}

                  {/* VIDEOS MANAGER FORM */}
                  {currentManagerSubTab === 'video' && (
                    <form onSubmit={handleSaveVideo} className="space-y-4">
                      <div>
                        <label className="text-xs font-black text-gray-700 block mb-1">عنوان ملخص الفيديو</label>
                        <input 
                          type="text" 
                          value={vidTitle} 
                          onChange={(e) => setVidTitle(e.target.value)}
                          placeholder="ملخص مباراة المغرب وإسبانيا (3-1) حماس الأبطال..."
                          className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-hidden font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-black text-gray-700 block mb-1">رابط مصغرة الغلاف (Thumbnail)</label>
                        <input 
                          type="text" 
                          value={vidThumb} 
                          onChange={(e) => setVidThumb(e.target.value)}
                          placeholder="أدخل رابط صورة الغلاف الملائمة"
                          className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-hidden font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs font-black text-gray-700 block mb-1">مدة المقطع</label>
                          <input 
                            type="text" 
                            value={vidDuration} 
                            onChange={(e) => setVidDuration(e.target.value)}
                            placeholder="04:15"
                            className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-hidden font-mono font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-black text-gray-700 block mb-1">قناة البث / مصدر الناشر</label>
                          <input 
                            type="text" 
                            value={vidPublisher} 
                            onChange={(e) => setVidPublisher(e.target.value)}
                            className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-hidden font-bold"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-black text-gray-700 block mb-1">رابط ملف دفق الفيديو الجاري (.mp4)</label>
                        <input 
                          type="text" 
                          value={vidUrl} 
                          onChange={(e) => setVidUrl(e.target.value)}
                          className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-hidden font-mono text-[10px]"
                        />
                      </div>
                      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-black py-2 px-4 rounded-lg shadow-xs cursor-pointer">
                        {editModeId ? 'تعديل الفيديو ' : 'عرض الفيديو للمشاهدين'}
                      </button>
                    </form>
                  )}

                  {(editModeId || artTitle || matchHome || matchAway || vidTitle) && (
                    <button 
                      type="button"
                      onClick={clearAllFormFields} 
                      className={`w-full mt-2 text-xs font-black py-2 px-3 rounded-lg cursor-pointer text-center transition-colors ${
                        editModeId 
                          ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      }`}
                    >
                      {editModeId 
                        ? (isEn ? "Dismiss Edit Mode (Cancel)" : "إلغاء وتراجع عن خطوة التعديل") 
                        : (isEn ? "Clear Filled Fields" : "تصفير ومسح حقول الملء الحالية")}
                    </button>
                  )}
                </div>

                {/* 2. Right Side (Span 2): Active Items Directory Lists */}
                <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-xs antialiased">
                  <h3 className="text-sm font-black text-[#111827] border-b border-gray-100 pb-2 mb-4">
                    🔍 العناصر والمنشورات الحالية على قاعدة البيانات (إجمالي: {
                      currentManagerSubTab === 'news' ? articles.length :
                      currentManagerSubTab === 'matches' ? matches.length : videos.length
                    })
                  </h3>

                  {/* ACTIVE ARTICLES LIST */}
                  {currentManagerSubTab === 'news' && (
                    <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
                      {articles.map((art) => (
                        <div key={art.id} className="p-3 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-slate-50 transition-colors flex gap-3 items-start justify-between">
                          <div className="flex gap-3 items-start">
                            <div className="w-12 h-12 rounded-lg bg-slate-200 overflow-hidden shrink-0 mt-0.5">
                              <img src={art.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <span className="text-[9px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-sm font-black inline-block mb-1">
                                {t(art.category)}
                              </span>
                              <h4 className="text-xs font-black text-slate-900 leading-tight line-clamp-1">{art.title}</h4>
                              <p className="text-[10px] text-gray-400 mt-1 font-bold">{art.publisherName} • {art.viewsCount} تصفح</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-1.5 shrink-0">
                            <button onClick={() => handleEditArticleTrigger(art)} className="p-1 px-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 text-[10px] font-black rounded-md cursor-pointer transition-colors flex items-center gap-1">
                              <Edit2 className="w-3 h-3" />
                              <span>تعديل</span>
                            </button>
                            <button onClick={() => handleDeleteArticle(art.id)} className="p-1 px-2.5 bg-red-50 hover:bg-red-100 text-red-650 text-[10px] font-black rounded-md cursor-pointer transition-colors flex items-center gap-1">
                              <Trash2 className="w-3 h-3" />
                              <span>حذف</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ACTIVE MATCHES LIST */}
                  {currentManagerSubTab === 'matches' && (
                    <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
                      {matches.map((m) => (
                        <div key={m.id} className="p-3 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                                m.status === 'live' ? 'bg-red-650 text-white animate-pulse' :
                                m.status === 'finished' ? 'bg-zinc-650 text-white' : 'bg-blue-650 text-white'
                              }`}>
                                {m.status === 'live' ? 'بث مباشر حية' : m.status === 'finished' ? 'انتهت' : 'قادمة'}
                              </span>
                              <span className="text-[9px] text-gray-400 font-bold">{m.group}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-lg">{m.teamHomeFlag}</span>
                              <span className="text-xs font-black text-slate-800">{m.teamHome}</span>
                              <span className="font-mono text-xs font-black text-blue-600 px-1">{m.scoreHome} - {m.scoreAway}</span>
                              <span className="text-xs font-black text-slate-800">{m.teamAway}</span>
                              <span className="text-lg">{m.teamAwayFlag}</span>
                            </div>
                          </div>

                          <div className="flex gap-1.5 shrink-0">
                            <button onClick={() => handleEditMatchTrigger(m)} className="p-1 px-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 text-[10px] font-black rounded-md cursor-pointer transition-colors flex items-center gap-1">
                              <Edit2 className="w-3 h-3" />
                              <span>تعديل</span>
                            </button>
                            <button onClick={() => handleDeleteMatch(m.id)} className="p-1 px-2.5 bg-red-50 hover:bg-red-100 text-red-650 text-[10px] font-black rounded-md cursor-pointer transition-colors flex items-center gap-1">
                              <Trash2 className="w-3 h-3" />
                              <span>حذف</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ACTIVE VIDEOS LIST */}
                  {currentManagerSubTab === 'video' && (
                    <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
                      {videos.map((vid) => (
                        <div key={vid.id} className="p-3 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-slate-50 transition-colors flex gap-3 items-start justify-between">
                          <div className="flex gap-3 items-start">
                            <div className="relative w-16 h-10 rounded-lg bg-slate-900 overflow-hidden shrink-0 mt-0.5">
                              <img src={vid.thumbnail} alt="" className="w-full h-full object-cover" />
                              <span className="absolute bottom-1 left-1 bg-black/75 text-white text-[8px] font-mono px-1 rounded-xs">{vid.duration}</span>
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-slate-900 leading-tight line-clamp-1">{vid.title}</h4>
                              <p className="text-[10px] text-gray-400 mt-1 font-bold">{vid.publisherName} • {vid.viewsCount} مشاهدة</p>
                            </div>
                          </div>

                          <div className="flex gap-1.5 shrink-0">
                            <button onClick={() => handleEditVideoTrigger(vid)} className="p-1 px-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 text-[10px] font-black rounded-md cursor-pointer transition-colors flex items-center gap-1">
                              <Edit2 className="w-3 h-3" />
                              <span>تعديل</span>
                            </button>
                            <button onClick={() => handleDeleteVideo(vid.id)} className="p-1 px-2.5 bg-red-50 hover:bg-red-100 text-red-650 text-[10px] font-black rounded-md cursor-pointer transition-colors flex items-center gap-1">
                              <Trash2 className="w-3 h-3" />
                              <span>حذف</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== POLICIES & COMPLIANCE CENTER ==================== */}
          {activeMainTab === 'policies' && (
            <motion.div
              key="policies-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="mt-4 text-right"
            >
              <LegalCenter 
                activeTab={activePolicyTab}
                setActiveTab={setActivePolicyTab}
                isEn={isEn}
                onSetCustomAlert={(alert) => {
                  if (alert) {
                    setCustomAlert({ message: alert.message });
                  } else {
                    setCustomAlert(null);
                  }
                }}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 3. Footer brand info */}
      <Footer onSelectPolicy={(key) => {
        setActivePolicyTab(key);
        setActiveMainTab('policies');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* ==================== THE LOGIN PORTAL MODAL ==================== */}
      <AnimatePresence>
        {loginModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs antialiased text-right">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-gray-100 w-full max-w-md p-6 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Reset button */}
              <button 
                onClick={() => setLoginModalOpen(false)}
                className="absolute top-4 left-4 p-1 rounded-full text-gray-400 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mx-auto mb-4 border border-blue-200">
                <Lock className="w-5 h-5 fill-current" />
              </div>

              <h3 className="text-base font-black text-slate-900 text-center">
                بوابة المشرفين - لوحة التحكم للمالك
              </h3>
              <p className="text-xs text-slate-500 text-center leading-relaxed mt-1 font-bold">
                للتحقق وطبقًا لشرط "أنا فقط من يستحق الدخول"، يرجى استخدام بريد حسني المعتمد.
              </p>

              {loginError && (
                <div className="mt-3.5 bg-red-50 border border-red-200 p-3 rounded-lg text-[11px] text-red-800 font-bold leading-normal">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="mt-4 space-y-4 font-black">
                <div>
                  <label className="text-xs font-black text-gray-700 block mb-1">البريد الإلكتروني (Email)</label>
                  <input 
                    type="email" 
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:outline-hidden font-mono"
                  />

                </div>

                <div>
                  <label className="text-xs font-black text-gray-700 block mb-1">كلمة المرور السريّة للتحكم</label>
                  <input 
                    type="password" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="إذا كنت تسجل لأول مرة، أي كلمة تكتبها ستصبح كود التحكم الدائم..."
                    className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:outline-hidden font-mono text-center"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-2.5 bg-[#004b91] hover:bg-blue-800 text-white text-xs font-black rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  الدخول المعتمد وتفعيل لوحة التحكم ☑️
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== ACTIVE VIDEO THEATER LIGHTBOX ==================== */}
      <AnimatePresence>
        {activeVideo && (
          <div 
            className="fixed inset-0 z-[210] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 text-right transition-all duration-300 antialiased" 
            onClick={() => setActiveVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button Inside Player */}
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 left-4 z-40 bg-black/60 hover:bg-black/90 p-1.5 rounded-full text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* HTML5 Video Source Container */}
              <div className="relative aspect-video w-full bg-black">
                <video 
                  src={activeVideo.videoUrl || "https://www.w3schools.com/html/movie.mp4"} 
                  autoPlay 
                  controls 
                  playsInline
                  className="w-full h-full"
                />
              </div>

              {/* Theater Information strip below video block */}
              <div className="p-4 md:p-6 text-white text-right font-sans">
                <span className="bg-blue-600 text-white text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-sm inline-block">
                  {isEn ? "1080P FULL HD" : "دقة عرض عالية الجودة 1080P"}
                </span>
                
                <h3 className="text-sm md:text-base font-black text-white mt-2 leading-snug">
                  {activeVideo.title}
                </h3>
                
                <div className={`flex flex-wrap items-center justify-between text-xs text-gray-400 mt-4 border-t border-slate-800 pt-4 font-bold ${isEn ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex items-center gap-3 ${isEn ? 'flex-row' : 'flex-row-reverse'}`}>
                    <span>{isEn ? "Publisher" : "مصدر اللقطة"}: <strong>{activeVideo.publisherName}</strong></span>
                    <span>•</span>
                    <span>{t(activeVideo.elapsed)}</span>
                  </div>
                  
                  <div className="flex gap-4">
                    <span>{activeVideo.viewsCount >= 1000 ? `${(activeVideo.viewsCount/1000).toFixed(0)}k ` : activeVideo.viewsCount} {isEn ? 'views' : 'مشاهدة'}</span>
                    
                    {/* Share trigger */}
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}#video-${activeVideo.id}`);
                        setCustomAlert({
                          message: isEn ? "Video link copied to clipboard!" : "تم نسخ رابط دفق الفيديو بنجاح لمشاركته!"
                        });
                      }}
                      className="text-blue-400 hover:text-blue-300 font-black cursor-pointer flex items-center gap-1"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{isEn ? "Share URL" : "مشاركة النبأ"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== CUSTOM ALERT MODAL ==================== */}
      <AnimatePresence>
        {customAlert && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs antialiased text-right">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-gray-150 w-full max-w-sm p-6 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-slate-900 text-center mb-2">إشعار المنصة</h3>
              <p className="text-xs text-slate-600 text-center leading-relaxed font-bold mb-4 whitespace-pre-line">
                {customAlert.message}
              </p>
              <button 
                onClick={() => setCustomAlert(null)}
                className="w-full py-2 bg-[#004b91] hover:bg-blue-800 text-white text-xs font-black rounded-lg shadow-xs transition-colors cursor-pointer text-center"
              >
                {isEn ? "Dismiss" : "حسناً، فهمت"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== CUSTOM CONFIRM MODAL ==================== */}
      <AnimatePresence>
        {customConfirm && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs antialiased text-right">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-gray-150 w-full max-w-sm p-6 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-100 animate-pulse">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-red-650 text-center mb-2">تأكيد الإجراء</h3>
              <p className="text-xs text-slate-600 text-center leading-relaxed font-bold mb-5 whitespace-pre-line">
                {customConfirm.message}
              </p>
              <div className="flex gap-2.5">
                <button 
                  onClick={() => setCustomConfirm(null)}
                  className="flex-1 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-black rounded-lg transition-colors cursor-pointer text-center"
                >
                  {isEn ? "Cancel" : "تراجع وإلغاء"}
                </button>
                <button 
                  onClick={() => {
                    customConfirm.onConfirm();
                    setCustomConfirm(null);
                  }}
                  className="flex-1 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-lg shadow-xs transition-colors cursor-pointer text-center"
                >
                  {isEn ? "Confirm" : "نعم، متأكد وموافق"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
