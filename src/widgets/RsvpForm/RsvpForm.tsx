import { useRef, useState } from "react";

type FormData = {
  name: string;
  phone: string;
  guests: string;
  attendance: "yes" | "maybe" | "no" | "";
  notes: string;
};

type DrinksState = {
  wine: number;
  champagne: number;
  martini: number;
  viski: number;
  vodka: number;
  coniak: number;
  pivo: number;
};
const RSVP_KEY = "rsvp_sent_at";
const ONE_HOUR = 1000 * 60 * 60;

export default function RsvpForm() {
  const [alreadySubmitted, setAlreadySubmitted] = useState(() => {
    const saved = localStorage.getItem(RSVP_KEY);

    if (!saved) return false;

    const diff = Date.now() - Number(saved);

    if (diff < ONE_HOUR) {
      return true;
    } else {
      localStorage.removeItem(RSVP_KEY);
      return false;
    }
  });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    guests: "",
    attendance: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [drinks, setDrinks] = useState<DrinksState>({
    wine: 0,
    champagne: 0,
    martini: 0,
    viski: 0,
    vodka: 0,
    coniak: 0,
    pivo: 0,
  });

  const toggleDrink = (key: keyof DrinksState) => {
    setDrinks((p) => ({ ...p, [key]: p[key] ? 0 : 1 }));
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    let cleaned = numbers;

    if (cleaned.startsWith("8")) {
      cleaned = "7" + cleaned.slice(1);
    }

    if (!cleaned.startsWith("7")) {
      cleaned = "7" + cleaned;
    }

    cleaned = cleaned.slice(0, 11);

    const match = cleaned.match(/^(\d)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);

    if (!match) return "";

    return `+${match[1]} (${match[2]}${match[3] ? `) ${match[3]}` : ""}${
      match[4] ? `-${match[4]}` : ""
    }${match[5] ? `-${match[5]}` : ""}`;
  };

  const errorRef = useRef<HTMLDivElement | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Введите имя";
    if (!formData.phone.trim() || formData.phone.length < 10)
      newErrors.phone = "Введите корректный номер";
    if (!formData.guests) newErrors.guests = "Укажите количество гостей";
    if (!formData.attendance) newErrors.attendance = "Выберите вариант";

    const hasDrink =
      Object.values(drinks).some((v) => v > 0) ||
      formData.notes.trim().length > 0;

    if (!hasDrink) {
      newErrors.drinks = "Выберите напиток или оставьте комментарий";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // защита от дубля
    setLoading(true);

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      requestAnimationFrame(() => {
        errorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });

      setLoading(false);
      return;
    }

    const payload = {
      ...formData,
      drinks,
    };

    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${API_URL}/items/rsvps`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Ошибка API");
      }

      setErrors({});
      setApiError(null);
      setSuccess(true);
      localStorage.setItem(RSVP_KEY, String(Date.now()));
      setAlreadySubmitted(true);
    } catch (err) {
      console.error(err);
      let message = "Ошибка отправки заявки";

      if (err instanceof Error) {
        message = "Ошибка: " + err.message;
      }

      setApiError(message);
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      setSuccess(false);
    }, 3500);
  };

  if (alreadySubmitted) {
    return (
      <section className="pt-12">
        <div className="max-w-[800px] mx-auto bg-[#790013] rounded-[20px] p-10 text-center text-white">
          <div className="text-3xl mb-4">Вы уже отправили заявку ❤️</div>
          <p className="text-lg opacity-80">Спасибо! Мы получили ваш ответ</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-12">
        <form
          onSubmit={handleSubmit}
          className="max-w-[800px] mx-auto bg-[#790013] rounded-[20px] p-6 md:p-10 flex flex-col gap-10"
        >
          {/* TITLE */}
          <div className="text-center text-white">
            <div className="text-3xl leading-7 sm-title text-white">
              Подтверждение присутствия
            </div>
            <p className="text-lg pt-4 sm-title">
              Сообщите нам о своём решении
            </p>
          </div>

          {Object.keys(errors).length > 0 && (
            <div
              ref={errorRef}
              className="animate-in fade-in slide-in-from-top-2 text-[#790013] text-md space-y-1 bg-white rounded-md p-4"
            >
              {Object.values(errors).map((e, i) => (
                <div key={i}>• {e}</div>
              ))}
            </div>
          )}

          {/* FORM SECTION */}
          <div className="border-b border-[#E8D5D0] pb-8">
            <h3 className="text-lg mb-5 text-white sm-title">О вас</h3>

            <div className="flex flex-col gap-5">
              <input
                className="w-full px-4 py-3 border border-[#E8D5D0] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#B8956B] bg-white text-black"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
              />

              <input
                type="tel"
                className="w-full px-4 py-3 rounded-[10px] bg-white text-black"
                placeholder="+7 (999) 999-99-99"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    phone: formatPhone(e.target.value),
                  }))
                }
              />

              <select
                className="w-full px-4 py-3 border border-[#E8D5D0] rounded-[10px] bg-white focus:ring-2 focus:ring-[#B8956B] text-black"
                value={formData.guests}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, guests: e.target.value }))
                }
              >
                <option value="">Гости</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <select
                className="w-full px-4 py-3 border border-[#E8D5D0] rounded-[10px] bg-white focus:ring-2 focus:ring-[#B8956B] text-black"
                value={formData.attendance}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    attendance: e.target.value as FormData["attendance"],
                  }))
                }
              >
                <option value="">Придёте?</option>
                <option value="yes">Обязательно буду</option>
                <option value="maybe">Пока не могу дать точного ответа</option>
                <option value="no">К сожалению не смогу</option>
              </select>
            </div>
          </div>

          {/* DRINKS */}
          <div className="border-b border-[#E8D5D0] pb-8">
            <h3 className="font-serif text-lg mb-5 text-white sm-title">
              Алкогольная карта
            </h3>

            <div className="flex flex-wrap gap-4">
              {[
                { key: "wine", label: "Вино" },
                { key: "champagne", label: "Шампанское" },
                { key: "martini", label: "Мартини" },
                { key: "viski", label: "Виски" },
                { key: "vodka", label: "Водка" },
                { key: "coniak", label: "Коньяк" },
                { key: "pivo", label: "Пиво" },
              ].map((d) => (
                <div
                  key={d.key}
                  onClick={() => toggleDrink(d.key as keyof DrinksState)}
                  className={`flex-1 min-w-[120px] cursor-pointer rounded-[14px] p-5 text-center border-2 transition-all
                ${
                  drinks[d.key as keyof DrinksState] > 0
                    ? "border-[#B8956B] bg-[rgba(184,149,107,0.05)]"
                    : "border-transparent bg-white hover:border-[#D4B896]"
                }`}
                >
                  <h4
                    className={`font-serif text-[18px] sm-title
                ${
                  drinks[d.key as keyof DrinksState] > 0
                    ? "text-white"
                    : "text-black"
                }`}
                  >
                    {d.label}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* NOTES */}
          <textarea
            className="w-full min-h-[100px] px-4 py-3 border border-[#E8D5D0] rounded-[10px] bg-white focus:ring-2 focus:ring-[#B8956B] text-black"
            placeholder="Свои пожелания по напиткам..."
            value={formData.notes}
            onChange={(e) =>
              setFormData((p) => ({ ...p, notes: e.target.value }))
            }
          />
          {apiError && (
            <div className="bg-white text-[#790013] p-3 rounded-md">
              {apiError}
            </div>
          )}

          {/* SUBMIT */}
          <button
            disabled={loading}
            type="submit"
            className="w-full max-w-[350px] mx-auto py-4 rounded-full bg-white uppercase tracking-widest sm-title text-lg font-bold shadow-[0_8px_25px_rgba(184,149,107,0.3)] hover:-translate-y-0.5 transition text-[#790013]"
          >
            {loading ? "Отправка..." : "Отправить"}
          </button>
        </form>
      </section>
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl p-8 text-center max-w-sm shadow-xl">
            <div className="text-2xl mb-2">Спасибо ❤️</div>
            <p className="text-sm text-gray-600">
              Ваша заявка успешно отправлена
            </p>

            <button
              className="mt-5 px-5 py-2 bg-[#790013] text-white rounded-full"
              onClick={() => setSuccess(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
}
