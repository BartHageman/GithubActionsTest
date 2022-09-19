var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var core = require('@actions/core');
var github = require('@actions/github');
var main = function () { return __awaiter(_this, void 0, void 0, function () {
    var owner, repo, pr_number, token, octokit, changedFiles, diffData, _i, changedFiles_1, file, fileExtension, _a, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 14, , 15]);
                owner = core.getInput('owner', { required: true });
                repo = core.getInput('repo', { required: true });
                pr_number = core.getInput('pr_number', { required: true });
                token = core.getInput('token', { required: true });
                octokit = new github.getOctokit(token);
                return [4 /*yield*/, octokit.rest.pulls.listFiles({
                        owner: owner,
                        repo: repo,
                        pull_number: pr_number
                    })];
            case 1:
                changedFiles = (_b.sent()).data;
                diffData = {
                    additions: 0,
                    deletions: 0,
                    changes: 0
                };
                // Reference for how to use Array.reduce():
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
                diffData = changedFiles.reduce(function (acc, file) {
                    acc.additions += file.additions;
                    acc.deletions += file.deletions;
                    acc.changes += file.changes;
                    return acc;
                }, diffData);
                _i = 0, changedFiles_1 = changedFiles;
                _b.label = 2;
            case 2:
                if (!(_i < changedFiles_1.length)) return [3 /*break*/, 12];
                file = changedFiles_1[_i];
                fileExtension = file.filename.split('.').pop();
                _a = fileExtension;
                switch (_a) {
                    case 'md': return [3 /*break*/, 3];
                    case 'js': return [3 /*break*/, 5];
                    case 'yml': return [3 /*break*/, 7];
                    case 'yaml': return [3 /*break*/, 9];
                }
                return [3 /*break*/, 11];
            case 3: return [4 /*yield*/, octokit.rest.issues.addLabels({
                    owner: owner,
                    repo: repo,
                    issue_number: pr_number,
                    labels: ['markdown']
                })];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5: return [4 /*yield*/, octokit.rest.issues.addLabels({
                    owner: owner,
                    repo: repo,
                    issue_number: pr_number,
                    labels: ['javascript']
                })];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7: return [4 /*yield*/, octokit.rest.issues.addLabels({
                    owner: owner,
                    repo: repo,
                    issue_number: pr_number,
                    labels: ['yaml']
                })];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9: return [4 /*yield*/, octokit.rest.issues.addLabels({
                    owner: owner,
                    repo: repo,
                    issue_number: pr_number,
                    labels: ['yaml']
                })];
            case 10:
                _b.sent();
                _b.label = 11;
            case 11:
                _i++;
                return [3 /*break*/, 2];
            case 12: 
            /**
             * Create a comment on the PR with the information we compiled from the
             * list of changed files.
             */
            return [4 /*yield*/, octokit.rest.issues.createComment({
                    owner: owner,
                    repo: repo,
                    issue_number: pr_number,
                    body: "\n        Pull Request #".concat(pr_number, " has been updated with: \n\n        - ").concat(diffData.changes, " changes \n\n        - ").concat(diffData.additions, " additions \n\n        - ").concat(diffData.deletions, " deletions \n\n      ")
                })];
            case 13:
                /**
                 * Create a comment on the PR with the information we compiled from the
                 * list of changed files.
                 */
                _b.sent();
                return [3 /*break*/, 15];
            case 14:
                error_1 = _b.sent();
                core.setFailed(error_1.message);
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); };
// Call the main function to run the action
main();
