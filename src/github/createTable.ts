import table from 'markdown-table';
import { PackageBenchmarkSummary, Document, config, getPercentDiff } from '../common';
import { metrics, Metric } from './metrics';

export function createTable(a: Document<PackageBenchmarkSummary>, b: Document<PackageBenchmarkSummary>, prNumber: number) {
  return table([
    ['', 'master', `#${prNumber}`, 'diff'],
    ['**Batch compilation**'],
    createRowFromMetric(metrics.typeCount, a, b),
    createRowFromMetric(metrics.assignabilityCacheSize, a, b),
    createRowFromMetric(metrics.subtypeCacheSize, a, b),
    createRowFromMetric(metrics.identityCacheSize, a, b),
    ['**Language service measurements**'],
    createRowFromMetric(metrics.samplesTaken, a, b),
    createRowFromMetric(metrics.identifierCount, a, b),
    ['`getCompletionsAtPosition`'], 
    createRowFromMetric(metrics.completionsMean, a, b),
    createRowFromMetric(metrics.completionsMedian, a, b),
    createRowFromMetric(metrics.completionsStdDev, a, b),
    createRowFromMetric(metrics.completionsWorstMean, a, b),
    createRow('Worst identifier', a, b, x => sourceLink(
      x.body.completions.worst.identifierText,
      x.body.sourceVersion,
      x.body.completions.worst.fileName,
      x.body.completions.worst.line)),
    ['`getQuickInfoAtPosition`'],
    createRowFromMetric(metrics.quickInfoMean, a, b),
    createRowFromMetric(metrics.quickInfoMedian, a, b),
    createRowFromMetric(metrics.quickInfoStdDev, a, b),
    createRowFromMetric(metrics.quickInfoWorstMean, a, b),
    createRow('Worst identifier', a, b, x => sourceLink(
      x.body.quickInfo.worst.identifierText,
      x.body.sourceVersion,
      x.body.quickInfo.worst.fileName,
      x.body.quickInfo.worst.line)),
    ['**System information**'],
    createRow('CPU count', a, b, x => x.system.cpus.length),
    createRow('CPU speed', a, b, x => `${x.system.cpus[0].speed / 100} GHz`),
    createRow('CPU model', a, b, x => x.system.cpus[0].model),
    createRow('CPU Architecture', a, b, x => x.system.arch),
    createRow('Memory', a, b, x => `${x.system.totalmem / 2 ** 30} GiB`),
    createRow('Platform', a, b, x => x.system.platform),
    createRow('Release', a, b, x => x.system.release),
  ]);
}

interface DiffOptions {
  noDiff?: boolean;
}

function sourceLink(text: string, sourceVersion: string, fileName: string, line: number) {
  return `[${text}](/${config.github.commonParams.owner}/${config.github.commonParams.repo}/blob/${sourceVersion}/${fileName}#L${line})`;
}

function createRowFromMetric(metric: Metric, a: Document<PackageBenchmarkSummary>, b: Document<PackageBenchmarkSummary>) {
  return createRow(metric.columnName, a, b, metric.getValue);
}

function createRow(
  title: string,
  a: Document<PackageBenchmarkSummary>,
  b: Document<PackageBenchmarkSummary>,
  getValue: (x: Document<PackageBenchmarkSummary>) => number | string | undefined,
  diffOptions: DiffOptions = {},
) {
  const aValue = getValue(a);
  const bValue = getValue(b);
  const percentDiff = !diffOptions.noDiff && typeof aValue === 'number' && typeof bValue === 'number' && !isNaN(bValue) && !isNaN(bValue)
    ? getPercentDiff(aValue, bValue)
    : undefined;
  
  return [
    `**${title}**`,
    format(aValue),
    format(bValue),
    typeof percentDiff === 'number' ? formatDiff(percentDiff) : '',
  ];
}

function formatDiff(percentDiff: number) {
  const percentString = `${percentDiff > 0 ? '+' : ''}${percentDiff * 100}%`;
  if (percentDiff > config.comparison.percentDiffSevereThreshold) {
    return `**${percentString}** 🚨`;
  }
  if (percentDiff > config.comparison.percentDiffWarningThreshold) {
    return `**${percentString}** 🔸`;
  }
  if (percentDiff < config.comparison.percentDiffGoldStarThreshold) {
    return `**${percentString}** 🌟`;
  }
  return percentString;
}

function format(x: string | number | undefined): string {
  switch (typeof x) {
    case 'string': return x;
    case 'number': return isNaN(x) ? 'N/A' : x.toPrecision(3);
    default: return '';
  }
}
