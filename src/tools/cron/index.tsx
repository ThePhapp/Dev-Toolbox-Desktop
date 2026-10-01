import { useState } from 'react';
import { CopyButton, ToolHeader, ToolPanel } from '../../components/ToolUi';

const options = {
  minute: [
    ['*', 'Every minute'],
    ['0', 'At minute 0'],
    ['*/5', 'Every 5 minutes'],
    ['*/15', 'Every 15 minutes'],
    ['30', 'At minute 30'],
  ],
  hour: [
    ['*', 'Every hour'],
    ['0', 'At midnight'],
    ['9', 'At 09:00'],
    ['12', 'At noon'],
    ['18', 'At 18:00'],
  ],
  day: [
    ['*', 'Every day'],
    ['1', 'First day'],
    ['15', '15th day'],
  ],
  month: [
    ['*', 'Every month'],
    ['1', 'January'],
    ['6', 'June'],
    ['12', 'December'],
  ],
  weekday: [
    ['*', 'Every weekday'],
    ['1-5', 'Monday–Friday'],
    ['0', 'Sunday'],
    ['6', 'Saturday'],
  ],
} as const;

export function CronTool() {
  const [values, setValues] = useState({
    minute: '0',
    hour: '9',
    day: '*',
    month: '*',
    weekday: '1-5',
  });
  const expression = Object.values(values).join(' ');
  return (
    <>
      <ToolHeader
        title="Cron Builder"
        description="Build standard five-field cron expressions."
      />
      <ToolPanel title="Schedule" actions={<CopyButton value={expression} />}>
        <div className="cron-grid">
          {Object.entries(options).map(([field, choices]) => (
            <label key={field}>
              <span>{field}</span>
              <select
                value={values[field as keyof typeof values]}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [field]: event.target.value,
                  }))
                }
              >
                {choices.map(([value, label]) => (
                  <option value={value} key={value}>
                    {label} ({value})
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </ToolPanel>
      <div className="cron-output">
        <code>{expression}</code>
        <p>Runs using the target system's timezone.</p>
      </div>
    </>
  );
}
