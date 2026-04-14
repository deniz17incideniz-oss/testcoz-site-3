'use client';

import questions from './questions.json';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function TestPaperPage() {
  const handlePrint = () => window.print();

  return (
    <main className="exam-page">
      <div className="watermark" aria-hidden="true">TESTCOZ</div>

      <div className="paper">
        <header className="paper-header">
          <div className="brand">TESTCOZ</div>
          <div className="meta">
            <h1>4. Sınıf Matematik — Sıvı Ölçme</h1>
            <p>Zorluk: Zor • Toplam Soru: {questions.length}</p>
          </div>
          <button type="button" className="print-btn" onClick={handlePrint}>
            Print / PDF
          </button>
        </header>

        <section className="questions-grid">
          {questions.map((question, index) => (
            <article key={question.id} className="question-card">
              <div className="question-number">{index + 1}</div>

              <p className="question-text">{question.text}</p>

              {question.statements?.length ? (
                <div className="statement-list">
                  {question.statements.map((statement) => (
                    <p key={statement}>{statement}</p>
                  ))}
                </div>
              ) : null}

              {question.table ? (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        {question.table.headers.map((header) => (
                          <th key={header}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {question.table.rows.map((row, rowIndex) => (
                        <tr key={`${question.id}-${rowIndex}`}>
                          {row.map((cell) => (
                            <td key={cell}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {question.afterTableText ? <p className="question-text">{question.afterTableText}</p> : null}
              {question.boldText ? <p className="question-bold">{question.boldText}</p> : null}

              <div className="options-grid">
                {question.options.map((option, optionIndex) => (
                  <div key={option} className="option-item">
                    <span>{OPTION_LABELS[optionIndex]})</span>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <footer className="paper-footer">testcoz.pro</footer>
      </div>

      <style jsx>{`
        .exam-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #eef6ff 0%, #f8fbff 100%);
          padding: 24px;
          position: relative;
          color: #0f172a;
          font-family: 'Segoe UI', Arial, sans-serif;
        }

        .watermark {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-24deg);
          font-size: clamp(5rem, 13vw, 12rem);
          font-weight: 900;
          letter-spacing: 0.8rem;
          color: rgba(30, 64, 175, 0.06);
          z-index: 0;
          pointer-events: none;
          user-select: none;
        }

        .paper {
          max-width: 1200px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 18px;
          box-shadow: 0 20px 48px rgba(15, 23, 42, 0.08);
          border: 1px solid #dbeafe;
          padding: 24px;
          position: relative;
          z-index: 1;
        }

        .paper-header {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 16px;
          align-items: center;
          border-bottom: 2px solid #dbeafe;
          padding-bottom: 16px;
          margin-bottom: 20px;
        }

        .brand {
          background: #1d4ed8;
          color: #fff;
          border-radius: 10px;
          padding: 10px 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .meta h1 {
          margin: 0;
          font-size: 1.2rem;
          color: #1e3a8a;
        }

        .meta p {
          margin: 4px 0 0;
          color: #334155;
          font-size: 0.95rem;
        }

        .print-btn {
          border: none;
          background: #2563eb;
          color: #fff;
          border-radius: 10px;
          padding: 10px 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.22);
        }

        .questions-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .question-card {
          border: 1px solid #dbeafe;
          border-radius: 14px;
          padding: 14px;
          background: #fefefe;
          box-shadow: 0 8px 22px rgba(59, 130, 246, 0.08);
          break-inside: avoid;
        }

        .question-number {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          background: #dbeafe;
          color: #1e3a8a;
          border-radius: 999px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .question-text,
        .question-bold,
        .statement-list p,
        .option-item {
          white-space: pre-line;
          overflow-wrap: anywhere;
          font-size: 0.92rem;
          line-height: 1.55;
        }

        .question-bold {
          font-weight: 700;
          margin: 8px 0;
        }

        .statement-list {
          margin: 10px 0;
          padding-left: 2px;
        }

        .statement-list p {
          margin: 6px 0;
        }

        .table-wrap {
          overflow-x: auto;
          margin: 10px 0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.84rem;
        }

        th,
        td {
          border: 1px solid #bfdbfe;
          padding: 6px;
          text-align: left;
        }

        th {
          background: #eff6ff;
          color: #1e3a8a;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          margin-top: 10px;
        }

        .option-item {
          border: 1px solid #dbeafe;
          background: #f8fbff;
          border-radius: 10px;
          padding: 8px;
          display: flex;
          gap: 6px;
          align-items: flex-start;
        }

        .option-item span:first-child {
          font-weight: 700;
          color: #1e3a8a;
        }

        .paper-footer {
          border-top: 2px solid #dbeafe;
          margin-top: 20px;
          padding-top: 12px;
          text-align: center;
          color: #475569;
          font-weight: 600;
          letter-spacing: 0.08em;
        }

        @media (max-width: 960px) {
          .questions-grid {
            grid-template-columns: 1fr;
          }

          .paper-header {
            grid-template-columns: 1fr;
          }

          .print-btn {
            width: fit-content;
          }
        }

        @media print {
          .exam-page {
            background: #fff;
            padding: 0;
          }

          .paper {
            border: none;
            border-radius: 0;
            box-shadow: none;
            padding: 8mm;
            max-width: 100%;
          }

          .watermark {
            color: rgba(15, 23, 42, 0.04);
            position: fixed;
          }

          .print-btn {
            display: none;
          }

          .questions-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .question-card,
          .option-item {
            box-shadow: none;
            background: #fff;
          }
        }
      `}</style>
    </main>
  );
}
