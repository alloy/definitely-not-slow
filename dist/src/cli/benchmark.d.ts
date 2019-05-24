import { Args } from '../common';
import { PackageId } from 'types-publisher/bin/lib/packages';
export interface BenchmarkPackageOptions {
    groups?: PackageId[][];
    agentIndex?: number;
    package?: string;
    upload: boolean;
    tsVersion: string;
    progress: boolean;
    iterations: number;
    nProcesses: number;
    maxRunSeconds?: number;
    printSummary: boolean;
    definitelyTypedPath: string;
    failOnErrors?: boolean;
    installTypeScript?: boolean;
}
export declare function benchmark(args: Args): Promise<void>;
export declare function benchmarkPackage(packageName: string, packageVersion: string, batchRunStart: Date, options: BenchmarkPackageOptions): Promise<import("../common").PackageBenchmark[]>;