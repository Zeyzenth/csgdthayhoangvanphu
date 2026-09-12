import React, { useState } from 'react';
import { X, Users, Copy, Check, ExternalLink, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export const ZALO_COMMUNITY_LINK = 'https://zalo.me/g/dl12ml2pvgod0by8n65m';

interface CommunityQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommunityQrModal: React.FC<CommunityQrModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(ZALO_COMMUNITY_LINK);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-7 z-10 border border-slate-100 animate-in fade-in zoom-in duration-200 text-slate-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 pt-1">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 mb-1 border border-amber-200 shadow-inner">
            <Users className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-900 border border-blue-200 px-3 py-0.5 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Cộng Đồng Học Tập & Tư Vấn</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 leading-tight">
            Nhóm Zalo Hỗ Trợ & Giải Đáp
          </h3>
          <p className="text-xs text-slate-600 max-w-xs mx-auto">
            Giao lưu, nhận tài liệu học tập chọn lọc miễn phí và được Thầy Hoàng cùng giáo viên trực tiếp giải đáp thắc mắc.
          </p>
        </div>

        {/* QR Code Container */}
        <div className="my-5 flex flex-col items-center justify-center p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
          <div className="p-3 bg-white rounded-xl shadow-md border border-slate-100">
            <QRCodeSVG
              value={ZALO_COMMUNITY_LINK}
              size={180}
              level="H"
            />
          </div>
          <p className="text-xs text-slate-700 font-semibold mt-3 text-center">
            Mở ứng dụng <span className="text-blue-800 font-bold">Zalo</span> trên điện thoại và <span className="text-emerald-700 font-bold">quét mã QR</span> để tham gia ngay
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <a
            href={ZALO_COMMUNITY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm rounded-xl text-center shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <span>Mở Trực Tiếp Nhóm Zalo</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Đã sao chép liên kết vào bộ nhớ tạm!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Sao Chép Đường Dẫn Nhóm</span>
              </>
            )}
          </button>
        </div>

        {/* Footnote */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-900 flex-shrink-0" />
          <span>Nhóm chính thức thuộc Cơ sở giáo dục Thầy Hoàng - Vạn Phú</span>
        </div>
      </div>
    </div>
  );
};
