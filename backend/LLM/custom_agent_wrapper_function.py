from google.adk.agents import LlmAgent
from google.adk.models.lite_llm import LiteLlm
from google.adk.tools import AgentTool
from google.adk.tools import FunctionTool
from os.path import dirname, join

def build_agent(agent_type = LlmAgent,
                out_key = 'output',
                desc = 'default description if I forget to input on declaration',
                llm = 'ollama/llama3.1:8b',
                name = 'default_agent_name',
                instr_file_path: str = None,
                customtools: FunctionTool = [],
                subagents = [],
                before_agent_call = None,
                before_tool_call = None,
                before_model_call = None,
                after_agent_call = None,
                after_tool_call = None,
                after_model_call = None,
                temp = 0.7
                ):

    #FILE FORMATTING

    if instr_file_path != None:
        try:
            with open(instr_file_path, "r", encoding="utf-8") as file:
                instr = file.read()
        except(FileNotFoundError):
            instr = "this is a fallback in case the .txt file path used for your instructions doesn't exist, which may or may not mean your whole instructions were inserted as an argument instead of a file path. If the following information isn't information at all and just a file path, kindly ignore any message received and notify the user of this error, otherwise, forget about this previous explanation, and here's your instructions:\n" + instr_file_path
    else:
        instr = "Default instructions of LLM agent. Agent, if this is what's showing up in your instructions, it means a developer forgot to put in an instruction file for you while using the custom wrapping builder I made for calling agent objects. You will have to make do with the description and information of your available tools and sub-agents to figure out what your function and purpose are, good luck. If you don't even have tools or sub-agents, just notify the user that this happened, and default to being a generic chatbot LLM."

    helperstr = ""
    for tool in customtools:
        helperstr += f'Tool name: {tool.name}\nTool description: {tool.description}\n\n'
    instr = instr.replace("$TOOL DESCRIPTION LIST$", helperstr)
    instr = instr.replace("$NUMBER OF TOOLS$", str(len(customtools)))
    helperstr = ""
    for agent in subagents:
        helperstr += f'Sub-agent name: {agent.name}\nAgent\'s description: {agent.description}\n\n'
    instr = instr.replace("$SUB-AGENT DESCRIPTION LIST$", helperstr)
    instr = instr.replace("$NUMBER OF SUB-AGENTS$", str(len(subagents)))

    #CALL

    return agent_type(
        model=LiteLlm(model=llm, temperature = temp),
        name=name,
        description=desc,
        instruction=instr,
        tools=customtools,
        sub_agents=subagents,
        output_key=out_key,
        before_agent_callback=before_agent_call,
        before_tool_callback=before_tool_call,
        before_model_callback=before_model_call,
        after_agent_callback=after_agent_call,
        after_tool_callback=after_tool_call,
        after_model_callback=after_model_call
    )